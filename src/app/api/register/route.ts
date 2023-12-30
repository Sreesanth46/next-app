import prisma from '@/../prisma/client';
import { registerUserSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      auth: {
        create: {
          password: body.password
        }
      }
    }
  });

  return NextResponse.json(newUser, { status: 201 });
}
