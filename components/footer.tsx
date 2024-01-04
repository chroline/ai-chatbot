import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      <a
        href={'https://github.com/chroline/ling385-chatbot'}
        target="_blank"
        className="font-medium hover:underline"
      >
        Open-source project
      </a>{' '}
      made by{' '}
      <a
        href={'https://colegaw.in'}
        target="_blank"
        className="font-medium hover:underline"
      >
        Cole Gawin
      </a>
      .
    </p>
  )
}
