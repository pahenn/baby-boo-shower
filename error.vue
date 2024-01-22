<script setup lang="ts">
  import type { NuxtError } from "#app"
  import type { ParsedContent } from "@nuxt/content/dist/runtime/types"

  useSeoMeta({
    title: "There's nothing to learn about Boo here!",
    description:
      "Go back to the last place you were, that's probably your best bet. Or maybe restart you computer 3 times, I have no idea really",
  })

  defineProps<{
    error: NuxtError
  }>()

  useHead({
    htmlAttrs: {
      lang: "en",
    },
  })

  const { data: navigation } = await useAsyncData(
    "navigation",
    () => fetchContentNavigation(),
    { default: () => [] }
  )
  const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
    default: () => [],
    server: false,
  })

  provide("navigation", navigation)
</script>

<template>
  <div>
    <Header />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <ClientOnly>
      <LazyUDocsSearch
        :files="files"
        :navigation="navigation"
        hide-color-mode
      />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
