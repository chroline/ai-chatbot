import Mustache from 'mustache'
import { openai } from '@/lib/server-utils'
import promptTemplate from '@/lib/prompts/FIND_RELEVANT_SOURCES'

export default async function findRelevantSources(
  query: string,
  context: string
) {
  const prompt = Mustache.render(promptTemplate, { query, context })

  return openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 0
    })
    .then(v => v.choices[0].message.content as string)
    .then(v => JSON.parse(v) as number[])
    .catch(() => [] as number[])
}
