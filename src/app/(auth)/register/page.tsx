'use client';

import { z } from 'zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/error/ErrorMessage';
import { registerUserSchema } from '@/app/validationSchemas';

type TRegisterForm = z.infer<typeof registerUserSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registerUserSchema)
  });

  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true);
      await axios.post('/api/register', data);
      router.push('/login');
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
            placeholder="Enter your name"
            {...register('name')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
