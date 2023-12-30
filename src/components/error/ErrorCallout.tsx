import { Callout } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

export default function ErrorCallout({ children }: PropsWithChildren) {
  if (!children) return null;

  return (
    <Callout.Root className="mb-5" color="red">
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}
