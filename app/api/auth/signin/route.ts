

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

   

    // Find user by email and explicitly include the password field
const user = await User.findOne({ email });
console.log(user)
if (!user) {
  return NextResponse.json(
    { message: 'Invalid credentials' },  // Generic message for security
    { status: 401 }
  );
}

// Check password - ensure comparePassword is defined in your User model
const isMatch = await user.comparePassword(password);
if (!isMatch) {
  return NextResponse.json(
    { message: 'Invalid credentials' },  // Same message to prevent enumeration
    { status: 401 }
  );
}

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    // Return user data and token (to be stored in localStorage)
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token, // This will be stored in localStorage
      message: 'Login successful'
    }, { status: 200 });

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}