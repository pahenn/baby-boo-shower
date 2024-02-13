<script setup lang="ts">
  // useSeoMeta({
  //   title: page.value.title,
  //   ogTitle: page.value.title,
  //   description: page.value.description,
  //   ogDescription: page.value.description,
  // })

  // defineOgImage({
  //   component: "Baby Boo",
  //   title: page.value.title,
  //   description: page.value.description,
  // })

  const { $directus, $readItems } = useNuxtApp()

  const { data: posts } = await useAsyncData("posts", () => {
    return $directus.request(
      $readItems("posts", {
        // fields: ["*", { "*": ["*"] }],
      })
    )
  })

  console.log(posts.value)
  // :image="{
  //           src: `${$directus.url}assets/${post.image}`,
  //         }"
</script>

<template>
  <UContainer>
    <UPageBody>
      <UBlogList>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="`/blog/${post.id}`"
          :title="post.title"
          :description="post.description"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2',
          }"
        >
          <template #image>
            <NuxtImg
              provider="directus"
              :src="post.image"
            />
          </template>
        </UBlogPost>
      </UBlogList>
    </UPageBody>
    <!-- <UPageHeader
      v-bind="page"
      class="py-[50px]"
    /> -->
    <!-- <UPageBody>
      <UBlogList>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post._path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="
            new Date(post.date).toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          "
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2',
          }"
        />
      </UBlogList>
    </UPageBody> -->
  </UContainer>
</template>
