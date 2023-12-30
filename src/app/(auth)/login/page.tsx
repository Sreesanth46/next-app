'use client';

import { z } from 'zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@radix-ui/themes';
import { loginSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/error/ErrorMessage';

type TLoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true);
      await axios.post('/api/login', data);
    } catch (error) {
      setSubmitting(false);
      setError('An error occurred');
    }
  });
  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Enter your email"
            {...register('email')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            placeholder="Enter your password"
            {...register('password')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button>Submit</Button>
      </form>
    </div>
  );
}
