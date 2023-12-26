import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ChatSourcesProps {
  sources: { filename: string; header: string }[]
}

export function ChatSources({ sources }: ChatSourcesProps) {
  return (
    <div className="bg-accent/70 dark:bg-accent/30 border rounded-md p-4 mt-2">
      <p className="font-bold opacity-50 text-xs mb-2">READ MORE</p>
      <div className="flex flex-wrap overflow-hidden">
        {sources.map((source, i) => (
          <Link
            key={i}
            href={`https://notes.colegaw.in/course/ling-385/${encodeURIComponent(
              source.filename
            )}#heading-${encodeURIComponent(source.header)}`}
            target={'_blank'}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'xs' }),
              'shrink-0 mr-1 mt-1 shadow-none text-left'
            )}
          >
            <span>
              {source.filename}{' '}
              <span className="opacity-50 ml-1"># {source.header}</span>
            </span>
            <svg
              aria-hidden="true"
              height="7"
              viewBox="0 0 6 6"
              width="7"
              className="opacity-70 ml-1 shrink-0"
            >
              <path
                d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
