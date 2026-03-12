import { NextResponse } from 'next/server';

/**
 * Step 2: Generate SSO Token (Mocked Flow)
 * This function simulates the ITP (Identity Token Provider) flow.
 * In a real-world scenario, this would involve calling a Wix SSO endpoint
 * to exchange the account details for a secure SSO token.
 * 
 * @param accountId - The ID of the newly provisioned Wix account
 * @returns A mocked SSO URL for seamless dashboard transition
 */
function generateMockSsoUrl(accountId: string): string {
  // This demonstrates the seamless transition concept for the Wix Partner integration PoC
  return `https://manage.wix.com/dashboard?mockSsoToken=true&accountId=${accountId}`;
}

export async function POST() {
  try {
    // 1. Environment Variables Check
    const WIX_API_KEY = process.env.WIX_API_KEY;

    if (!WIX_API_KEY) {
      console.error('Missing WIX_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Internal Server Error: Missing Wix API Key' },
        { status: 500 }
      );
    }

    // 2. Step 1 - Provision Account (Real API Call)
    // Payload based on the requested structure for the Wix Create Account API
    const provisionPayload = {
      roles: ['owner_role_id_mock'],
      user: {
        sso_identities: [
          {
            sso_id: 'mock_sso_id',
            user_id: 'mock_user_id',
          },
        ],
        email: {
          is_verified: true,
          email_address: 'testuser@vistacarve.com',
        },
      },
    };

    const response = await fetch('https://www.wixapis.com/accounts/v1/accounts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': WIX_API_KEY,
      },
      body: JSON.stringify(provisionPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Wix API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to provision Wix account', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const accountId = data.accountId;

    if (!accountId) {
      return NextResponse.json(
        { error: 'Invalid response from Wix API: Missing accountId' },
        { status: 502 }
      );
    }

    // 3. Step 2 - Generate SSO Token (Mocked Flow)
    const ssoUrl = generateMockSsoUrl(accountId);

    // 4. Response
    return NextResponse.json({ ssoUrl }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error in wix-provision API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
