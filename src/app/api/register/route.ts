import bcrypt from 'bcrypt';
import prisma from '@/../prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { registerUserSchema } from '@/app/validationSchemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        auth: {
          create: {
            password: hashedPassword
          }
        }
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(`Couldn't register`, { status: 201 });
  }
}
