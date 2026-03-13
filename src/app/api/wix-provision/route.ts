import { NextResponse } from 'next/server';

/**
 * PURE MOCK B2B API: Exactly 1500ms delay and no strict validation.
 * This route ensures a stable demonstration for the Solution Engineer assignment PoC.
 */
export async function POST() {
  try {
    // 1. Simulated network delay: Exactly 1500ms as requested
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 2. Return 200 HTTP status code with the exact requested JSON response
    return NextResponse.json(
      {
        "success": true,
        "accountId": "mock-b2b-account-987654321",
        "ssoUrl": "/websites/success"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[MOCK B2B API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
