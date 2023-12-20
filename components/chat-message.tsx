// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { ChatSources } from '@/components/chat-sources'

export interface ChatMessageProps {
  message: { role: string; content: string }
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const contentAndSources = message.content.split('<<SOURCES>>')
  console.log(contentAndSources)

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        {contentAndSources[0].length > 0 ? (
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[
              // @ts-ignore
              rehypeKatex
            ]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0 mt-1">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == '▍') {
                    return (
                      <span className="mt-1 cursor-default animate-pulse">
                        ▍
                      </span>
                    )
                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }

                const match = /language-(\w+)/.exec(className || '')

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {contentAndSources[0]}
          </MemoizedReactMarkdown>
        ) : (
          <p className="animate-pulse italic mt-1">Generating response...</p>
        )}
        {contentAndSources.length > 1 && (
          <ChatSources sources={JSON.parse(contentAndSources[1])} />
        )}
        {contentAndSources[0].length > 0 && (
          <ChatMessageActions message={message} />
        )}
      </div>
    </div>
  )
}
