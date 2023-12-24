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
import Spinner from '@/components/Spinner';

type TIssueForm = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<TIssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const onSubmit = handleSubmit(async (data: TIssueForm) => {
    try {
      setSubmitting(true)
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false)
      setError('An error occurred')
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className='mb-5' color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea placeholder="Description" {...register('description')} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>Submit New Issue {submitting && <Spinner />}</Button>
      </form>
    </div>
  );
}
