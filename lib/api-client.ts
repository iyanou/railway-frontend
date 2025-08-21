// API Client for communicating with the Elasticsearch Diagnostic Gateway
export class ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_GATEWAY_URL

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    // Configure timeout based on endpoint type
    let timeoutMs = 30000 // 30 seconds default
    if (endpoint.includes('/diagnose')) {
      timeoutMs = 900000 // 15 minutes for diagnostics
    }
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include' as RequestCredentials, // This is crucial for sending cookies
      signal: controller.signal, // Add abort signal for timeout
      ...options,
    }

    try {
      console.log(`[API CLIENT] Starting request to ${endpoint} with ${timeoutMs/1000}s timeout`)
      const response = await fetch(url, config)
      clearTimeout(timeoutId) // Clear timeout on successful response
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const data = await response.json()
          errorMessage = data.detail || data.error || errorMessage
        } catch {
          // If JSON parsing fails, use the HTTP status
        }
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      console.log(`[API CLIENT] Request to ${endpoint} completed successfully`)
      return { success: true, data }
    } catch (error) {
      clearTimeout(timeoutId) // Clear timeout on error
      
      if (error.name === 'AbortError') {
        console.error(`[API CLIENT] Request to ${endpoint} timed out after ${timeoutMs/1000}s`)
        return { 
          success: false, 
          error: `Request timed out after ${timeoutMs/1000} seconds. Large cluster diagnostics may take longer to complete.` 
        }
      }
      
      console.error('API Request failed:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  // Test connection to Elasticsearch cluster with user authentication
  async testConnection(credentials: any, userEmail?: string) {
    let endpoint = '/test-connection'
    
    // Add user_email parameter for Google OAuth authentication
    if (userEmail) {
      endpoint += `?user_email=${encodeURIComponent(userEmail)}`
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({ credentials })
    })
  }

  // Run diagnosis on a cluster with user authentication
  async runDiagnosis(request: any, userEmail?: string) {
    let endpoint = '/diagnose'
    
    // Add user_email parameter for Google OAuth authentication
    if (userEmail) {
      endpoint += `?user_email=${encodeURIComponent(userEmail)}`
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  // Get diagnosis history
  async getDiagnosisHistory(userEmail: string) {
    console.log('[API CLIENT] Getting diagnosis history for:', userEmail)
    console.log('[API CLIENT] Base URL:', this.baseUrl)
    const endpoint = `/diagnoses/history?user_email=${encodeURIComponent(userEmail)}`
    console.log('[API CLIENT] Full endpoint:', endpoint)
    const result = await this.request(endpoint)
    console.log('[API CLIENT] History API result:', result)
    return result
  }

  // Get specific diagnosis details
  async getDiagnosisDetails(id: string, userEmail: string) {
    return this.request(`/diagnoses/${id}?user_email=${encodeURIComponent(userEmail)}`)
  }

  // Delete a diagnosis
  async deleteDiagnosis(id: string, userEmail: string) {
    return this.request(`/diagnoses/${id}?user_email=${encodeURIComponent(userEmail)}`, { 
      method: 'DELETE' 
    })
  }

  // Get storage statistics (for debugging)
  async getStorageStats() {
    return this.request('/storage/stats')
  }

  // Get health status of the gateway and services
  async getHealthCheck() {
    return this.request('/health')
  }

  // Get supported Elasticsearch versions
  async getSupportedVersions() {
    return this.request('/versions')
  }

  // Get available diagnostic checks
  async getAvailableChecks() {
    return this.request('/checks')
  }

  // Quick diagnostics with user authentication
  async runQuickDiagnosis(credentials: any, userEmail?: string) {
    let endpoint = '/diagnose/quick'
    
    // Add user_email parameter for Google OAuth authentication
    if (userEmail) {
      endpoint += `?user_email=${encodeURIComponent(userEmail)}`
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({ credentials: credentials })  // ← Fixed: wrap in credentials object
    })
  }

  // Detect cluster nodes
  async detectNodes(credentials: any) {
    return this.request('/detect-nodes', {
      method: 'POST',
      body: JSON.stringify({ credentials })
    })
  }

  // Validate cluster size against tier limits with user authentication
  async validateClusterSize(credentials: any, pricingTier: string, userEmail?: string) {
    let endpoint = '/validate-cluster-size'
    
    // Add user_email parameter for Google OAuth authentication
    if (userEmail) {
      endpoint += `?user_email=${encodeURIComponent(userEmail)}`
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({ 
        credentials,
        pricing_tier: pricingTier
      })
    })
  }

  // Get retention policy information
  async getRetentionInfo(userEmail: string) {
    return this.request(`/retention/info?user_email=${encodeURIComponent(userEmail)}`)
  }

  // Trigger manual cleanup of expired data
  async cleanupExpiredData(userEmail?: string) {
    const body = userEmail ? JSON.stringify({ user_email: userEmail }) : '{}'
    return this.request('/maintenance/cleanup', {
      method: 'POST',
      body
    })
  }

  // Get storage statistics
  async getStorageStats() {
    return this.request('/storage/stats')
  }

  // Delete user account
  async deleteAccount() {
    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ confirmDelete: true })
      })
      
      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // If JSON parsing fails, try to get text
          try {
            const errorText = await response.text()
            errorMessage = errorText || errorMessage
          } catch {
            // Fallback to status code
          }
        }
        throw new Error(errorMessage)
      }
      
      const result = await response.json()
      return { success: true, ...result }
    } catch (error) {
      console.error('Delete account error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete account'
      }
    }
  }
}

export const apiClient = new ApiClient()
