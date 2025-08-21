// Mock database connection for Railway deployment

class MockDatabase {
  async query(sql: string, params?: any[]) {
    console.log('Mock DB Query:', sql, params)
    
    // Return mock data based on query type
    if (sql.includes('SELECT') && sql.includes('users')) {
      return [{
        id: 1,
        email: 'demo@elasticdoctor.com',
        name: 'Demo User',
        pricing_tier: 'developer'
      }]
    }
    
    if (sql.includes('SELECT') && sql.includes('clusters')) {
      return [{
        id: 1,
        name: 'Demo Cluster',
        host: 'demo.elasticsearch.com',
        port: 9200
      }]
    }
    
    return []
  }
  
  async execute(sql: string, params?: any[]) {
    return this.query(sql, params)
  }
}

// Mock database instance
const db = new MockDatabase()

export async function initializeDatabase() {
  // Mock initialization
  console.log('Mock database initialized')
  return true
}

export async function getCurrentUser() {
  // Mock current user
  return {
    id: 1,
    email: 'demo@elasticdoctor.com',
    name: 'Demo User',
    pricing_tier: 'developer'
  }
}

export { db }
export default db
