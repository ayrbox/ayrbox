import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ayrbox",
  description: "I start writing about new stuff that I learn everyday as software engineer.",
  themeConfig: {
    nav: [
      { text: 'Notes', link: '/notes' },
      { text: 'About', link: '/about' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayrbox/ayrbox' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/ayrbox/' }
    ],
    search: {
      provider: 'local'
    }
  }
})
