---
title: Notes
---

<script setup lang="ts">
import { data } from '/data/notes.data'

function getDateTime(time: number) {
  return new Date(time).toISOString()
}
</script>

# Ayrbox Notes

<ul class="blog-list">
  <li class="blog-entry" v-for="note of data">
    <article>
      <time :datetime="getDateTime(note.date.time)">{{
        note.date.string
      }}</time>
      <h2 class="title">
        <a :href="note.url">{{ note.title }}</a>
      </h2>
      <div
        v-if="note.excerpt"
        v-html="note.excerpt"
      ></div>
      <div class="read-more">
        <a class="link" aria-label="read more" :href="note.url">Read more →</a>
      </div>
    </article>
  </li>
</ul>

<style scoped>
.blog-list {
  list-style-type: none;
  padding: 0;
}
.blog-entry {
  margin-top: 3em;
  border-bottom: 1px solid var(--vp-c-divider);
}
.blog-entry time {
  font-size: 14px;
}
.title {
  border: none;
  margin-top: 0;
  padding-top: 0;
  font-size: 22px;
}
.title a {
  font-weight: 600;
  text-decoration: none;
}
.read-more {
  margin-bottom: 2rem;
}
</style>
