import Mustache from 'mustache'
import { openai } from '@/lib/server-utils'
import promptTemplate from '@/lib/prompts/REWORD_QUERY'

export default async function rewordQuery(
  query: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  const conversation = messages.map(
    message => `${message.role.toUpperCase()}: ${message.content}`
  )

  const prompt = Mustache.render(promptTemplate, { query, conversation })

  return openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 0.5,
      stream: false
    })
    .then(v => v.choices[0].message.content as string)
}
