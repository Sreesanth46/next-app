'use client';

class ErrorWithStatus extends Error {
  status: number | undefined | null;

  constructor(status?: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export const createError = (statusCode: number, message: string) =>
  new ErrorWithStatus(statusCode, message);
