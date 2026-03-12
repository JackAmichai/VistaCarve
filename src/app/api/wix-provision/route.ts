import { NextResponse } from 'next/server';

/**
 * MOCKED B2B FLOW: Simulating Account Provisioning and SSO generation.
 * This route is used for demonstration purposes in the Wix Solution Engineer assignment.
 * It removes all real external dependencies to ensure a stable PoC experience.
 */
export async function POST() {
  try {
    // 1. Simulate Network Delay
    // This allows the frontend to demonstrate its loading states (spinners/loaders)
    const delayMs = 1800; // Simulated latency of 1.8 seconds
    await new Promise((resolve) => setTimeout(resolve, delayMs));

    // 2. MOCKED B2B FLOW: Prepare simulated success response
    // In a production environment, this data would be fetched from:
    // https://www.wixapis.com/accounts/v1/accounts/create
    const mockResponse = {
      success: true,
      accountId: "mock-b2b-account-987654321",
      ssoUrl: "https://manage.wix.com/dashboard?mock_sso_session=true"
    };

    console.log('[MOCK B2B API] Successfully simulated site provisioning.');

    // 3. Return Mocked Response
    return NextResponse.json(mockResponse, { status: 200 });

  } catch (error) {
    console.error('[MOCK B2B API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
