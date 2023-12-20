import Mustache from 'mustache'
import { openai } from '@/lib/server-utils'
import promptTemplateWithContext from '@/lib/prompts/GENERATE_ANSWER'
import promptTemplateWithoutContext from '@/lib/prompts/GENERATE_ANSWER_NO_CONTEXT'

export default function generateAnswer(
  query: string,
  context: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  const prompt = Mustache.render(
    context.length > 0
      ? promptTemplateWithContext
      : promptTemplateWithoutContext,
    { query, context }
  )

  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [
      ...messages,
      {
        role: 'system',
        content: prompt
      }
    ],
    temperature: 0.5,
    stream: true
  })
}
