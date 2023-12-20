export default function transformDocsToContext(
  docs: {
    filename: string
    header: string
    content: string
  }[]
) {
  return docs
    .map((doc, index) => `Context ${index}:\n${doc.content}`)
    .join('\n\n---\n\n')
}
