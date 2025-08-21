import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import mysql from 'mysql2/promise'
import { NextAuthOptions } from 'next-auth'

// Enhanced database connection with better error handling
const createConnection = async () => {
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'elasticdoctor',
    password: process.env.DB_PASSWORD || 'elastic-1905Bis-doctor9420',
    database: process.env.DB_NAME || 'elasticdoctor',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectTimeout: 15000, // 15 seconds
    acquireTimeout: 15000, // 15 seconds
    timeout: 15000, // 15 seconds
    reconnect: true,
    idleTimeout: 300000, // 5 minutes
  }
  
  try {
    console.log('NextAuth: Attempting to connect to database at:', connectionConfig.host + ':' + connectionConfig.port)
    const connection = await mysql.createConnection(connectionConfig)
    console.log('NextAuth: Database connection successful')
    return connection
  } catch (error) {
    console.error('NextAuth: Database connection failed:', error)
    // Don't throw error for OAuth to continue working
    return null
  }
}

// Custom database operations
const dbOperations = {
  async findUserByGoogleId(googleId: string) {
    try {
      const connection = await createConnection()
      if (!connection) return null
      
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE google_id = ?',
        [googleId]
      )
      await connection.end()
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } catch (error) {
      console.error('NextAuth: Error finding user by Google ID:', error)
      return null
    }
  },

  async findUserByEmail(email: string) {
    try {
      const connection = await createConnection()
      if (!connection) return null
      
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      )
      await connection.end()
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } catch (error) {
      console.error('NextAuth: Error finding user by email:', error)
      return null
    }
  },

  async createGoogleUser(userData: any) {
    try {
      const connection = await createConnection()
      if (!connection) return null
      
      const [result] = await connection.execute(
        `INSERT INTO users (
          google_id, email, name, given_name, family_name, 
          profile_picture_url, email_verified, pricing_tier
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userData.google_id,
          userData.email,
          userData.name,
          userData.given_name,
          userData.family_name,
          userData.profile_picture_url,
          true, // Google emails are verified
          userData.pricing_tier || 'developer' // Default tier
        ]
      )
      
      // Get the created user
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [(result as any).insertId]
      )
      await connection.end()
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } catch (error) {
      console.error('NextAuth: Error creating user:', error)
      return null
    }
  },

  async updateUserLastLogin(userId: number) {
    try {
      const connection = await createConnection()
      if (!connection) return
      
      await connection.execute(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [userId]
      )
      await connection.end()
    } catch (error) {
      console.error('NextAuth: Error updating last login:', error)
    }
  },

  async linkGoogleAccount(userId: number, googleId: string, profilePicture: string) {
    try {
      const connection = await createConnection()
      if (!connection) return null
      
      await connection.execute(
        'UPDATE users SET google_id = ?, profile_picture_url = ? WHERE id = ?',
        [googleId, profilePicture, userId]
      )
      
      // Return updated user
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [userId]
      )
      await connection.end()
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } catch (error) {
      console.error('NextAuth: Error linking Google account:', error)
      return null
    }
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Simplified configuration to avoid timeout issues
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile'
        }
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback - url:', url, 'baseUrl:', baseUrl)
      
      // Handle account deactivated case
      if (url.includes('account_deactivated') || url.includes('AccountInactive')) {
        console.log('Account deactivated redirect detected')
        return `${baseUrl}/auth/account-deactivated`
      }
      
      // Handle sign out redirects
      if (url.includes('signout') || url.includes('/api/auth/signout')) {
        console.log('Sign out redirect detected, going to home page')
        return baseUrl
      }
      
      // For OAuth callbacks, prioritize the specified callback URL
      if (url.includes('/api/auth/callback/google')) {
        console.log('Google OAuth callback detected, full URL:', url)
        
        // Check if this is an error case (like registration attempt with existing user)
        if (url.includes('error=')) {
          const errorMatch = url.match(/error=([^&]+)/)
          if (errorMatch) {
            const errorType = decodeURIComponent(errorMatch[1])
            console.log('OAuth error detected:', errorType)
            
            // For registration errors, redirect to register page with error info
            if (url.includes('autoRegister=') || url.includes('source=pricing')) {
              console.log('Registration flow error, redirecting to register page')
              const planMatch = url.match(/[?&](?:autoRegister|tier)=([^&]+)/)
              const plan = planMatch ? decodeURIComponent(planMatch[1]) : 'developer'
              return `${baseUrl}/register?plan=${plan}&error=${errorType}`
            }
          }
        }
        
        // Try multiple ways to extract the callback URL
        const callbackPatterns = [
          /[?&]callbackUrl=([^&]+)/,
          /callbackUrl=([^&]+)/,
          /redirect_uri=([^&]+)/
        ]
        
        for (const pattern of callbackPatterns) {
          const match = url.match(pattern)
          if (match) {
            const callbackUrl = decodeURIComponent(match[1])
            console.log('Found callback URL with pattern:', pattern.source, '-> ', callbackUrl)
            
            if (callbackUrl.startsWith(baseUrl) || callbackUrl.startsWith('/')) {
              const fullCallbackUrl = callbackUrl.startsWith('/') ? `${baseUrl}${callbackUrl}` : callbackUrl
              console.log('Valid callback URL, redirecting to:', fullCallbackUrl)
              return fullCallbackUrl
            }
          }
        }
        
        console.log('No valid callback URL found, redirecting to login')
        return `${baseUrl}/login`
      }
      
      // Handle direct URLs
      if (url.startsWith(baseUrl)) {
        console.log('Valid direct URL:', url)
        return url
      }
      
      // Default to login page
      console.log('Default redirect to login page')
      return `${baseUrl}/login`
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn callback - Account provider:', account?.provider)
      console.log('SignIn callback - User email:', user?.email)
      
      if (account?.provider === 'google') {
        // Check if account is active before allowing sign-in
        try {
          const googleId = account.providerAccountId
          const email = user.email!
          
          // Check if user exists and is active
          let dbUser = await dbOperations.findUserByGoogleId(googleId)
          if (!dbUser) {
            // Check by email if not found by Google ID
            dbUser = await dbOperations.findUserByEmail(email)
          }
          
          if (dbUser && !dbUser.is_active) {
            console.log('❌ SignIn callback: Account is inactive, blocking sign-in')
            // Return false to block sign-in and trigger error
            return false
          }
          
          console.log('✓ Google sign-in allowed - account is active or new user')
          return true
        } catch (error) {
          console.error('SignIn callback error:', error)
          // Allow sign-in on database errors to avoid blocking legitimate users
          return true
        }
      }
      
      console.log('❌ Non-Google provider rejected:', account?.provider)
      return false
    },

    async jwt({ token, account, user, trigger }) {
      try {
        // Handle session refresh triggers (like after tier upgrades)
        if (trigger === 'update' && token.userId) {
          console.log('JWT callback - trigger update detected, refreshing user data for ID:', token.userId)
          try {
            // Get user by ID since we have the userId in token
            const connection = await createConnection()
            if (connection) {
              const [rows] = await connection.execute(
                'SELECT * FROM users WHERE id = ?',
                [token.userId]
              )
              await connection.end()
              
              if (Array.isArray(rows) && rows.length > 0) {
                const dbUser = rows[0] as any
                console.log('JWT refresh - Updated tier from DB:', dbUser.pricing_tier)
                token.pricingTier = dbUser.pricing_tier
                token.emailVerified = dbUser.email_verified
                console.log('JWT refresh - Token updated with new tier:', token.pricingTier)
              }
            }
          } catch (refreshError) {
            console.log('JWT refresh error:', refreshError)
          }
          return token
        }
        
        if (account && user) {
          console.log('JWT callback - processing new sign-in for:', user.email)
          console.log('Account details:', {
            provider: account.provider,
            type: account.type,
          })
          
          // First time user signs in
          const googleId = account.providerAccountId
          const email = user.email!
          
          // Check if user exists by Google ID
          let dbUser = await dbOperations.findUserByGoogleId(googleId)
          
          if (dbUser) {
            console.log('User found in database with tier:', dbUser.pricing_tier)
            
            // Check if account is active
            if (!dbUser.is_active) {
              console.log('❌ Account is inactive, rejecting sign-in for:', user.email)
              // Set a flag to indicate account is inactive
              token.accountInactive = true
              token.error = 'AccountInactive'
              return token
            }
            
            // User exists and is active, update last login and go straight to dashboard
            await dbOperations.updateUserLastLogin(dbUser.id)
            token.userId = dbUser.id
            token.pricingTier = dbUser.pricing_tier // **FIX 2: Always use DB tier as source of truth**
            token.emailVerified = dbUser.email_verified
            token.needsRegistration = false
            
            console.log('Setting token with correct tier from DB:', dbUser.pricing_tier)
            // Ensure we have the latest profile image
            if (user.image && user.image !== dbUser.profile_picture_url) {
              // Update profile picture in database if it's changed
              try {
                const connection = await createConnection()
                if (connection) {
                  await connection.execute(
                    'UPDATE users SET profile_picture_url = ? WHERE id = ?',
                    [user.image, dbUser.id]
                  )
                  await connection.end()
                }
              } catch (error) {
                console.error('Error updating profile picture:', error)
              }
            }
          } else {
            console.log('User not found in database, checking flow type...')
            
            // Check if user exists by email (might have registered before but never linked Google)
            const existingUser = await dbOperations.findUserByEmail(email)
            
            if (existingUser) {
              console.log('User found by email, checking if account is active...')
              
              // Check if account is active
              if (!existingUser.is_active) {
                console.log('❌ Account is inactive, rejecting sign-in for:', user.email)
                token.accountInactive = true
                token.error = 'AccountInactive'
                return token
              }
              
              console.log('User found by email, linking Google account with tier:', existingUser.pricing_tier)
              // Link Google account to existing user
              dbUser = await dbOperations.linkGoogleAccount(
                existingUser.id, 
                googleId, 
                user.image || ''
              )
              if (dbUser) {
                await dbOperations.updateUserLastLogin(dbUser.id)
                token.userId = dbUser.id
                token.pricingTier = dbUser.pricing_tier // **FIX 2: Use correct tier from linked account**
                token.emailVerified = dbUser.email_verified
                token.needsRegistration = false
                
                console.log('Linked account with tier:', dbUser.pricing_tier)
              }
            } else {
              // User doesn't exist - check if this is Flow 2 and auto-create immediately
              console.log('New user detected, checking for auto-registration...')
              
              // Check if there's pending registration data (Flow 2)
              // We'll detect this by checking if we're in a browser context and have sessionStorage
              if (typeof window !== 'undefined') {
                const pendingRegistration = sessionStorage.getItem('pendingRegistration')
                if (pendingRegistration) {
                  try {
                    const registrationData = JSON.parse(pendingRegistration)
                    console.log('Flow 2 detected in JWT: Auto-creating user with plan:', registrationData.plan)
                    
                    // Clear the pending registration immediately
                    sessionStorage.removeItem('pendingRegistration')
                    
                    // Create user immediately during OAuth
                    const name = user.name || ''
                    const [firstName, ...lastNameParts] = name.split(' ')
                    const lastName = lastNameParts.join(' ')
                    
                    try {
                      const newUser = await dbOperations.createGoogleUser({
                        google_id: googleId,
                        email: email,
                        name: name,
                        given_name: firstName,
                        family_name: lastName,
                        profile_picture_url: user.image || '',
                        pricing_tier: registrationData.plan
                      })
                      
                      if (newUser) {
                        console.log('Flow 2: New user created during OAuth with tier:', newUser.pricing_tier)
                        token.userId = newUser.id
                        token.pricingTier = newUser.pricing_tier
                        token.emailVerified = newUser.email_verified
                        token.needsRegistration = false
                        token.isNewUser = true
                        
                        console.log('Setting token pricing tier to:', newUser.pricing_tier)
                      } else {
                        console.log('Flow 2: Failed to create user during OAuth, marking as needs registration')
                        token.needsRegistration = true
                        token.googleId = googleId
                        token.userEmail = user.email
                        token.userName = user.name
                        token.userImage = user.image
                        token.pricingTier = registrationData.plan
                      }
                    } catch (createError) {
                      console.log('Flow 2: User creation failed, checking if user already exists:', createError.message)
                      // If user creation fails due to existing user, try to find them
                      const existingUser = await dbOperations.findUserByEmail(email)
                      if (existingUser && existingUser.is_active) {
                        console.log('Found existing active user during registration attempt, setting up normal session')
                        token.userId = existingUser.id
                        token.pricingTier = existingUser.pricing_tier
                        token.emailVerified = existingUser.email_verified
                        token.needsRegistration = false
                        await dbOperations.updateUserLastLogin(existingUser.id)
                        
                        // Update Google ID if it wasn't linked before
                        if (!existingUser.google_id) {
                          await dbOperations.linkGoogleAccount(existingUser.id, googleId, user.image || '')
                          console.log('Linked Google account to existing user')
                        }
                      } else {
                        console.log('Existing user not found or inactive, marking as needs registration')
                        token.needsRegistration = true
                        token.googleId = googleId
                        token.userEmail = user.email
                        token.userName = user.name
                        token.userImage = user.image
                        token.pricingTier = registrationData.plan
                      }
                    }
                  } catch (error) {
                    console.error('Flow 2: Error during auto-registration:', error)
                    token.needsRegistration = true
                    token.googleId = googleId
                    token.userEmail = user.email
                    token.userName = user.name
                    token.userImage = user.image
                  }
                } else {
                  // Flow 1: Mark as needing registration (will show options on login page)
                  console.log('Flow 1: User marked as needing registration')
                  token.needsRegistration = true
                  token.googleId = googleId
                  token.userEmail = user.email
                  token.userName = user.name
                  token.userImage = user.image
                }
              } else {
                // Server-side or no sessionStorage - mark as needing registration
                token.needsRegistration = true
                token.googleId = googleId
                token.userEmail = user.email
                token.userName = user.name
                token.userImage = user.image
              }
            }
          }
        } else if (token.needsRegistration && token.userEmail) {
          // For existing tokens, periodically check if registration was completed
          console.log('JWT callback - checking if registration completed for:', token.userEmail)
          try {
            const dbUser = await dbOperations.findUserByEmail(token.userEmail as string)
            if (dbUser) {
              console.log('Registration completed! Updating token with tier:', dbUser.pricing_tier)
              // User has completed registration, update token
              token.userId = dbUser.id
              token.pricingTier = dbUser.pricing_tier // **FIX 2: Always sync tier from database**
              token.emailVerified = dbUser.email_verified
              token.needsRegistration = false
              // Clear temporary registration data
              delete token.googleId
              delete token.userEmail
              delete token.userName
              delete token.userImage
              
              console.log('Token updated with correct tier:', dbUser.pricing_tier)
            }
          } catch (checkError) {
            console.log('Error checking registration status:', checkError)
            // Don't update token if check fails
          }
        }
        return token
      } catch (error) {
        console.error('JWT callback error:', error)
        // For new users or database connection errors, mark them as needing registration
        if (account && user) {
          console.log('Database error, marking user as needing registration')
          token.needsRegistration = true
          token.googleId = account.providerAccountId
          token.userEmail = user.email
          token.userName = user.name
          token.userImage = user.image
        }
        return token
      }
    },

    async session({ session, token }) {
      // Check if account is inactive
      if (token.accountInactive || token.error === 'AccountInactive') {
        // Return null session to force sign out and redirect
        console.log('Session callback: Account inactive, redirecting to deactivated page')
        // We'll handle the redirect in the frontend when session becomes null
        return null
      }
      
      // Only send full session data if user is completely registered
      if (token.userId && !token.needsRegistration) {
        // User has completed registration
        session.user.id = token.userId as number
        session.user.pricingTier = token.pricingTier as string
        session.user.emailVerified = token.emailVerified as boolean
        session.user.needsRegistration = false
        // Include new user flag for welcome flows
        if (token.isNewUser) {
          session.user.isNewUser = true
          // Clear the flag after first session to avoid showing welcome repeatedly
          delete token.isNewUser
        }
      } else if (token.needsRegistration) {
        // User needs registration - provide minimal session data
        session.user.needsRegistration = true
        session.user.googleId = token.googleId as string
        session.user.email = token.userEmail as string
        session.user.name = token.userName as string
        session.user.image = token.userImage as string
        // Don't provide user.id - this prevents dashboard access
        delete session.user.id
      }
      return session
    },
    
    async signOut({ token, session }) {
      console.log('NextAuth signOut callback - clearing session data')
      // Ensure all user data is cleared from the token
      return true
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
}

const handler = NextAuth(authOptions)

// Export authOptions for use in other API routes
export { handler as GET, handler as POST, authOptions }
