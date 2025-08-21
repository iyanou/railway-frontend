// Mock database models for Railway deployment

export interface User {
  id: number
  email: string
  name: string
  google_id?: string
  pricing_tier: 'developer' | 'professional'
  created_at: string
  updated_at: string
}

export interface Cluster {
  id: number
  user_id: number
  name: string
  host: string
  port: number
  scheme: 'http' | 'https'
  username?: string
  password_encrypted?: string
  es_version?: string
  last_status?: 'healthy' | 'warning' | 'critical' | 'unknown'
  created_at: string
  updated_at: string
}

// Mock data
export const mockClusters: Cluster[] = [
  {
    id: 1,
    user_id: 1,
    name: 'Demo Production Cluster',
    host: 'demo.elasticsearch.com',
    port: 9200,
    scheme: 'https',
    es_version: '8.11.0',
    last_status: 'healthy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export class ClusterService {
  static async findByUserId(userId: number): Promise<Cluster[]> {
    return mockClusters.filter(c => c.user_id === userId)
  }
  
  static async findById(id: number): Promise<Cluster | null> {
    return mockClusters.find(c => c.id === id) || null
  }
  
  static async create(clusterData: Partial<Cluster>): Promise<Cluster> {
    const newCluster: Cluster = {
      id: mockClusters.length + 1,
      user_id: clusterData.user_id!,
      name: clusterData.name!,
      host: clusterData.host!,
      port: clusterData.port || 9200,
      scheme: clusterData.scheme || 'https',
      username: clusterData.username,
      password_encrypted: clusterData.password_encrypted,
      es_version: clusterData.es_version,
      last_status: 'unknown',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    mockClusters.push(newCluster)
    return newCluster
  }
  
  static async update(id: number, updates: Partial<Cluster>): Promise<Cluster | null> {
    const index = mockClusters.findIndex(c => c.id === id)
    if (index === -1) return null
    
    mockClusters[index] = { ...mockClusters[index], ...updates }
    return mockClusters[index]
  }
  
  static async delete(id: number): Promise<boolean> {
    const index = mockClusters.findIndex(c => c.id === id)
    if (index === -1) return false
    
    mockClusters.splice(index, 1)
    return true
  }
}

export default ClusterService
