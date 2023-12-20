import promptTemplateWithoutContext from './GENERATE_ANSWER_NO_CONTEXT'

export default `${promptTemplateWithoutContext}

Use the following pieces of context to come up with a response to a user's query.

Use only information found in the context. If the context is unhelpful, ignore it.

NEVER explicitly mention the existence of the "provided context"; as far as the user knows, you know all of the context already.

Be as specific and include as much relevant detail as possible.

- Use bold or italic text.
- If part of the input should be a list, please format it as a bulleted or numbered list. For instance, comma separated lists should be bulleted lists, and processes should be written as numbers.
- ALWAYS wrap math equations with double dollar signs. Example: \`$$\\frac{x_i}{3}$$\`.
- Whenever there is code, format it appropriately. Wrap the code with three tilde (example: \`\`\`CODE\`\`\`).

---

{{context}}

---

User query: "{{query}}"
`
