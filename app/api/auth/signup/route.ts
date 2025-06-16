import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, email, password, role } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const user = new User({ name, email, password, role });
    await user.save();

    // const token = generateToken({
    //   id: user._id,
    //   email: user.email,
    //   role: user.role,
    // });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      
    };
    console.log(userData)

    return NextResponse.json(userData, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}