import { createDirectus, rest, readItem, readItems } from "@directus/sdk"

const directus = createDirectus("https://cms.babyboo2024.com").with(rest())

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, readItem, readItems },
  }
})
