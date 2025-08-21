import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('user_email');
    const days = searchParams.get('days') || '7';
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'user_email parameter is required' },
        { status: 400 }
      );
    }

    // Forward request to gateway
    const gatewayUrl = `${GATEWAY_URL}/usage/stats?user_email=${encodeURIComponent(userEmail)}&days=${days}`;
    
    const response = await fetch(gatewayUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: data.detail || 'Failed to fetch usage statistics' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Usage stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
