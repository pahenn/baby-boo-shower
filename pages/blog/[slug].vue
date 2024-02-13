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

  console.log(post.value)

  // const { data: surround } = await useAsyncData(
  //   `${route.path}-surround`,
  //   () =>
  //     queryContent("/blog")
  //       .where({ _extension: "md" })
  //       .without(["body", "excerpt"])
  //       .sort({ date: -1 })
  //       .findSurround(withoutTrailingSlash(route.path)),
  //   { default: () => [] }
  // )

  const title = post.value.head?.title || post.value.title
  const description = post.value.head?.description || post.value.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  })

  if (post.value.image?.src) {
    const site = useSiteConfig()

    useSeoMeta({
      ogImage: joinURL(site.url, post.value.image.src),
      twitterImage: joinURL(site.url, post.value.image.src),
    })
  } else {
    defineOgImage({
      component: "Baby Boo",
      title,
      description,
      headline: "Blog",
    })
  }
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

        <!-- <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            :alt="author.name"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div> -->
      </UPageHeader>

      <UPageBody prose>
        <div
          v-if="post.body"
          v-html="$mdRenderer.render(post.body)"
          class="flex flex-col w-full"
        />

        <!-- <hr v-if="surround?.length" /> -->

        <!-- <UDocsSurround :surround="surround" /> -->
      </UPageBody>
    </UPage>
  </UContainer>
</template>
