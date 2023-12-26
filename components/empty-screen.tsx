import { buttonVariants } from '@/components/ui/button'
import { IconArrowRight, IconSeparator } from '@/components/ui/icons'
import { USCShieldLogo } from '@/components/logos/usc-shield'
import { USCWordmarkLogo } from '@/components/logos/usc-wordmark'
import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const links = [
  {
    heading: 'See all lecture notes',
    url: `https://notes.colegaw.in/course/ling-385`
  },
  {
    heading: 'View source code',
    url: 'https://github.com/chroline/ling385-chatbot'
  }
]

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <div className="text-[#990000] dark:text-white">
          <div className="flex flex-col md:flex-row items-center justify-center mb-2 md:mb-4">
            <div className="flex items-center justify-center mb-4 md:mb-0">
              <USCShieldLogo className="h-12 mr-4" />
              <USCWordmarkLogo className="h-8" />
            </div>
            <IconSeparator className="w-8 h-8 mx-4 text-muted-foreground/50 hidden md:block" />
            <h1 className="text-3xl font-bold text-center font-mono">
              LING 385
            </h1>
          </div>
          <h1 className="mb-4 mt-1 text-xl font-medium text-center">
            Human Language as Computation
          </h1>
        </div>
        <div className="space-y-2">
          <p className="leading-normal text-muted-foreground">
            This is an AI chatbot trained on lecture notes from the LING 385:
            Human Language as Computation, a class at USC in Fall 2023.
          </p>
          <p className="leading-normal text-muted-foreground">
            Try asking questions regarding Hopfield Networks, embeddings, LLMs,
            Stochastic Gradient Descent, etc. You can also select which lectures
            to query to pull information from.
          </p>
        </div>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {links.map((message, i) => (
            <Link
              key={i}
              href={message.url}
              className={cn(
                buttonVariants({ variant: 'link' }),
                'h-auto p-0 text-base'
              )}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
