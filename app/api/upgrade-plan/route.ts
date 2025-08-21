import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Mock implementation for Railway deployment
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { plan } = await request.json()
    
    // Mock plan upgrade (for demo, we just return success)
    console.log('Mock: Plan upgrade requested for user:', user.email, 'to plan:', plan)
    
    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to ${plan} plan (demo mode)`,
      newPlan: plan,
      user: {
        ...user,
        pricing_tier: plan
      }
    })

  } catch (error) {
    console.error('Upgrade plan error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upgrade plan' },
      { status: 500 }
    )
  }
}
