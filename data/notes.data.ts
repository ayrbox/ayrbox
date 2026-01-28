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
  excerpt: true,
  transform(raw): Note[] {
    const notes = raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        excerpt,
      }))
      .sort((a, b) => b.date.time - a.date.time)
    return notes;
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
