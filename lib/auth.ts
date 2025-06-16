// import jwt from 'jsonwebtoken';
const jwt =require('jsonwebtoken')

const JWT_SECRET = "hello world"
const JWT_EXPIRES_IN =  '1d';

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    return verifyToken(token);
  } catch (error) {
    throw new Error('Invalid token');
  }
}