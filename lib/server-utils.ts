import OpenAI from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
  environment: 'gcp-starter'
})
export const pineconeIndex = pinecone.index('lecture-notes')

export async function aggregateStream(stream: ReadableStream) {
  return await new Promise(resolve => {
    let response = ''
    const transformStream = new TransformStream({
      transform(chunk) {
        response += new TextDecoder('utf-8').decode(chunk)
      },
      flush() {
        resolve(response)
      }
    })
    stream.pipeTo(transformStream.writable)
  })
}
