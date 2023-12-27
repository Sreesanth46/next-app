"use client"

import { Button, TextField } from '@radix-ui/themes';
import React from 'react';

export default function RegisterForm() {
  return (
    <form className="flex flex-col justify-center max-w-sm mx-auto">
      <div className="mb-5">
        <TextField.Input placeholder="Enter your email" />
      </div>
      <div className="mb-5">
        <TextField.Input placeholder="Enter your password" />
      </div>
      <Button>Submit</Button>
    </form>
  );
}
