import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Admin credentials
    const adminCredentials = {
      email: 'admin@bugintel.com',
      password: 'Admin@123',
    };

    // Mock authentication - in production, verify against database with bcrypt
    if (email === adminCredentials.email && password === adminCredentials.password) {
      return NextResponse.json(
        {
          success: true,
          user: {
            id: '1',
            email: email,
            name: 'Muhammad Ali Sheikh',
            role: 'admin',
          },
          token: 'mock-jwt-token-admin',
        },
        { status: 200 }
      );
    }

    // Additional demo credentials
    const demoCredentials = [
      {
        email: 'shaffan@bugintel.com',
        password: 'Demo@123',
        name: 'Shaffan Asher',
      },
      {
        email: 'faraz@bugintel.com',
        password: 'Demo@123',
        name: 'Faraz Ahmad Butt',
      },
    ];

    const demoUser = demoCredentials.find((cred) => cred.email === email && cred.password === password);
    if (demoUser) {
      return NextResponse.json(
        {
          success: true,
          user: {
            id: '2',
            email: email,
            name: demoUser.name,
            role: 'developer',
          },
          token: 'mock-jwt-token-user',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
