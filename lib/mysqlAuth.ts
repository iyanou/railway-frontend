// Mock MySQL Auth for Railway deployment
// This provides basic authentication functionality for demo

export interface AuthUser {
  id: number
  email: string
  name: string
  pricing_tier: 'developer' | 'professional'
}

// Mock user data for demo
const mockUsers: AuthUser[] = [
  {
    id: 1,
    email: 'demo@elasticdoctor.com',
    name: 'Demo User',
    pricing_tier: 'developer'
  }
]

export function useAuth() {
  // Mock authentication hook
  return {
    user: mockUsers[0],
    isLoading: false,
    login: async (email: string, password: string) => {
      // Mock login
      return { success: true, user: mockUsers[0] }
    },
    logout: async () => {
      // Mock logout
      return { success: true }
    }
  }
}

export class MySQLAuth {
  static async findUserByEmail(email: string): Promise<AuthUser | null> {
    return mockUsers.find(u => u.email === email) || null
  }
  
  static async createUser(userData: {
    email: string
    name: string
    google_id?: string
  }): Promise<AuthUser> {
    const newUser: AuthUser = {
      id: mockUsers.length + 1,
      email: userData.email,
      name: userData.name,
      pricing_tier: 'developer'
    }
    mockUsers.push(newUser)
    return newUser
  }
  
  static async getUserById(id: number): Promise<AuthUser | null> {
    return mockUsers.find(u => u.id === id) || null
  }
}

export default MySQLAuth
