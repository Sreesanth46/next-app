'use client';

import React, { useState } from 'react';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/components/ErrorMessage';

type TIssueForm = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<TIssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const submit = async (data: TIssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An error occurred')
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className='mb-5' color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(submit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea placeholder="Description" {...register('description')} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}
