import bcrypt from 'bcrypt';
import prisma from '@/../prisma/client';
import { loginSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { createError } from '@/app/api/_utils/error';

export async function POST(request: NextRequest) {
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

    if (!passwordMatches) createError(401, 'Invalid credentials');

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    const status = error.status || 400;
    const message = error.message || 'Invalid credentials';
    return NextResponse.json({ message }, { status });
  }
}
