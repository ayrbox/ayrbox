import { createContentLoader } from 'vitepress'

interface Note {
  title: string
  url: string
  excerpt?: string;
  date: {
    time: number
    string: string
  }
}

declare const data: Note[]
export { data }

export default createContentLoader('notes/*.md', {
  transform(raw): Note[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),

      }))
      .sort((a, b) => b.date.time - a.date.time)
  },
})

function formatDate(raw: string): Note['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
