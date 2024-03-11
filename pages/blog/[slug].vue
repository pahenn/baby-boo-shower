<script setup lang="ts">
  import { withoutTrailingSlash, joinURL } from "ufo"
  const { $directus, $readItems, $preview } = useNuxtApp()

  const route = useRoute()

  if ($preview) {
    const { data: post } = await useAsyncData(
      "posts",
      () => {
        return $directus.request(
          $readItems("posts", {
            filter: {
              slug: {
                _eq: route.params.slug,
              },
            },
          })
        )
      },
      {
        transform: (data) => data[0],
      }
    )
  }

  const { data: post } = await useAsyncData(
    "posts",
    () => {
      return $directus.request(
        $readItems("posts", {
          filter: {
            slug: {
              _eq: route.params.slug,
            },
          },
        })
      )
    },
    {
      transform: (data) => data[0],
    }
  )

  if (!post.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
      fatal: true,
    })
  }

  const title = post.value.head?.title || post.value.title
  const description = post.value.head?.description || post.value.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  })
</script>

<template>
  <UContainer v-if="post">
    <UPageHero
      :title="post.title"
      :description="post.description"
      align="center"
      class="py-8 sm:py-8 md:py-8 lg:py-8 xl:py-8"
    >
      <NuxtImg
        provider="directus"
        :src="post.image"
        :modifiers="{ key: 'scaled' }"
      />
    </UPageHero>

    <UPage>
      <UPageHeader>
        <template #headline>
          <div
            class="flex gap-1"
            v-for="tag in post.tags"
          >
            <UBadge
              :key="tag"
              :label="tag"
              variant="subtle"
            />
          </div>
          <span class="text-gray-500 dark:text-gray-400">&middot;</span>
          <time class="text-gray-500 dark:text-gray-400">{{
            new Date(post.date_published).toLocaleDateString("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}</time>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <div
          v-if="post.body"
          v-html="$mdRenderer.render(post.body)"
          class="flex flex-col w-full"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
