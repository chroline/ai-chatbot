export default `Provided the following pieces of context, determine which are useful for answering a user's query. (i.e., if a user was provided a certain piece of context, would they find it helpful in answering their query?)

Respond in a JSON array of numbers, where the array contains the numbers of the context pieces that are relevant.

---

User query: "{{query}}"

---

{{context}}

---

SOURCES:
`
