<script setup>
  const { $directus, $readItems } = useNuxtApp()

  const { data: global } = await useAsyncData("global", () => {
    return $directus.request($readItems("global"))
  })

  const { data: posts } = await useAsyncData("posts", () => {
    return $directus.request($readItems("posts"))
  })
</script>

<template>
  <h1>{{ global.title }}</h1>
  <p>{{ global.description }}</p>

  <UBlogList>
    <UBlogPost
      v-for="(post, index) in posts"
      :key="index"
      :title="post.title"
    />
  </UBlogList>
</template>
