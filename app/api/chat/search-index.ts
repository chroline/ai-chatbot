import { openai, pineconeIndex } from '@/lib/server-utils'

export default async function searchIndex(query: string, lectures: number[]) {
  const embedding = await openai.embeddings
    .create({
      input: query,
      model: 'text-embedding-ada-002'
    })
    .then(v => v.data[0].embedding)

  const res = await pineconeIndex.query({
    vector: embedding,
    topK: 4,
    includeValues: false,
    includeMetadata: true,
    filter: {
      filename: { $in: lectures.map(v => `Lecture ${v + 1}`) }
    }
  })

  return res.matches.map(doc => doc.metadata).filter(Boolean) as {
    filename: string
    header: string
    content: string
  }[]
}
