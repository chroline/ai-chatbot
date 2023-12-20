import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'

import { nanoid } from '@/lib/utils'
import searchIndex from '@/app/api/chat/search-index'
import transformDocsToContext from '@/app/api/chat/transform-docs-to-context'
import generateAnswer from '@/lib/chains/generate-answer'
import rewordQuery from '@/lib/chains/reword-query'
import findRelevantSources from '@/lib/chains/find-relevant-sources'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  const { messages: rawMessages, lectures } = json

  const messages = rawMessages.map(
    (message: { role: string; content: string }) => ({
      ...message,
      content: message.content.split('<<SOURCES>>')[0]
    })
  )

  const query = messages[messages.length - 1].content
  const modifiedQuery = await rewordQuery(query, messages)

  const docs = await searchIndex(modifiedQuery, lectures)
  const context = transformDocsToContext(docs)

  const relevantDocs = await findRelevantSources(query, context).then(indices =>
    docs.filter((_, i) => indices.includes(i))
  )
  const relevantContext = transformDocsToContext(relevantDocs)

  const stream = OpenAIStream(
    await generateAnswer(query, relevantContext, messages),
    {
      async onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100)
        const id = json.id ?? nanoid()
        const createdAt = Date.now()
        const path = `/chat/${id}`
        const payload = {
          id,
          title,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }
        await kv.hmset(`chat:${id}`, payload)
      }
    }
  )

  const newStream = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk)
    },
    flush(controller) {
      if (docs.length > 0) {
        controller.enqueue(
          Buffer.from(
            '<<SOURCES>>' +
              JSON.stringify(
                docs.map(doc => ({
                  filename: doc.filename,
                  header: doc.header
                }))
              ),
            'utf-8'
          )
        )
      }
    }
  })

  stream.pipeTo(newStream.writable)

  return new StreamingTextResponse(newStream.readable)
}
