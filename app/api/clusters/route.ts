import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { ClusterService } from '@/lib/models'
import { initializeDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase()
    
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const clusters = await ClusterService.findByUserId(user.id)
    
    // Remove sensitive data before sending
    const safeClusters = clusters.map(cluster => ({
      id: cluster.id,
      name: cluster.name,
      host: cluster.host,
      port: cluster.port,
      scheme: cluster.scheme,
      username: cluster.username,
      verify_certs: cluster.verify_certs,
      es_version: cluster.es_version,
      last_health_score: cluster.last_health_score,
      last_status: cluster.last_status,
      created_at: cluster.created_at,
      updated_at: cluster.updated_at
    }))
    
    return NextResponse.json({
      success: true,
      clusters: safeClusters
    })
    
  } catch (error) {
    console.error('Get clusters error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase()
    
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { name, host, port, scheme, username, password, api_key, verify_certs, ca_cert_path } = body
    
    if (!name || !host) {
      return NextResponse.json(
        { success: false, error: 'Name and host are required' },
        { status: 400 }
      )
    }
    
    // Check cluster limits based on user tier
    const existingClusters = await ClusterService.findByUserId(user.id)
    const tierLimits = {
      developer: 2,
      professional: 15,
      enterprise: 50
    }
    
    const limit = tierLimits[user.pricing_tier] || 2
    if (existingClusters.length >= limit) {
      return NextResponse.json(
        { success: false, error: `Cluster limit reached. Your ${user.pricing_tier} plan allows up to ${limit} clusters.` },
        { status: 403 }
      )
    }
    
    const cluster = await ClusterService.createCluster(user.id, {
      name,
      host,
      port,
      scheme,
      username,
      password,
      api_key,
      verify_certs,
      ca_cert_path
    })
    
    // Return safe cluster data
    return NextResponse.json({
      success: true,
      cluster: {
        id: cluster.id,
        name: cluster.name,
        host: cluster.host,
        port: cluster.port,
        scheme: cluster.scheme,
        username: cluster.username,
        verify_certs: cluster.verify_certs,
        created_at: cluster.created_at
      }
    })
    
  } catch (error) {
    console.error('Create cluster error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}