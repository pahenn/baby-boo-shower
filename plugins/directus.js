import { createDirectus, rest, readItem, readItems } from "@directus/sdk"

export default defineNuxtPlugin(() => {
  const directusUrl = useRuntimeConfig().public.directusUrl
  const directus = createDirectus(directusUrl).with(rest())
  return {
    provide: { directus, readItem, readItems },
  }
})
