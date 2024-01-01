import bcrypt from 'bcrypt';
import prisma from '@/../prisma/client';
import { loginSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler } from '../_utils/decorator';
import jwt from 'jsonwebtoken';
import { generateAuthToken } from '@/helpers/jwt';

async function login(request: NextRequest) {
  const body = await request.json();
  const validation = loginSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.email
      },
      include: { auth: true }
    });

    const passwordMatches = await bcrypt.compare(
      body.password,
      user.auth!.password
    );

    if (!passwordMatches) throw Error('Invalid credentials', { cause: 401 });

    const { auth, ...userWithoutPassword } = user;
    const { accessToken, refreshToken } =
      generateAuthToken(userWithoutPassword);

    const response = NextResponse.json(
      { ...userWithoutPassword },
      { status: 200 }
    );
    response.cookies.set('accessToken', accessToken);
    response.cookies.set('refreshToken', refreshToken);

    return response;
  } catch (error) {
    throw Error('Invalid credentials', { cause: 401 });
  }
}

export const POST = ErrorHandler(login);
