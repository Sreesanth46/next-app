'use client';

import React from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const { register, handleSubmit } = useForm<IssueForm>();
  const router = useRouter()

  const submit = async (data: IssueForm) => {
    await axios.post('/api/issues', data)
    router.push('/issues')
  } 

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(submit)}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <TextArea placeholder="Description" {...register('description')} />
      <Button>Submit New Issue</Button>
    </form>
  );
}
