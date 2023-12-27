'use client';

import React from 'react';
import { Button, TextField } from '@radix-ui/themes';

export default function LoginForm() {
  return (
    <form className="flex flex-col justify-center max-w-sm mx-auto">
      <div className="mb-5">
        <TextField.Input placeholder="Enter your email" />
      </div>
      <div className="mb-5">
        <TextField.Input placeholder="Enter your password" />
      </div>
      <Button>
        Login
      </Button>
    </form>
  );
}
