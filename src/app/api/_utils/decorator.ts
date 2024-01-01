import { NextRequest, NextResponse } from 'next/server';

export function ErrorHandler(
  handler: any,
  errorMessage: string = 'An unexpected error occurred',
  statusCode: number = 500
) {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error: any) {
      const message = error.message || errorMessage;
      const status = error.status || error.cause || statusCode;

      return NextResponse.json({ message }, { status });
    }
  };
}
