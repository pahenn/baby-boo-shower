<script setup lang="ts">
  import { withoutTrailingSlash, joinURL } from "ufo"

  const route = useRoute()

  const { $directus, $readItem } = useNuxtApp()

  const { data: post } = await useAsyncData(route.path, () => {
    return $directus.request(
      $readItem("posts", route.params.slug, {
        fields: ["*", { "*": ["*"] }],
      })
    )
  })
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
    <div>
      <NuxtImg :src="`${$directus.url}assets/${post.image.filename_disk}`" />

      <UPageHeader
        :title="post.title"
        :description="post.description"
      >
        <template #headline>
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            variant="subtle"
          />
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
    </div>

    <UPage>
      <UPageBody prose>
        <div
          v-if="post.body"
          v-html="$mdRenderer.render(post.body)"
        ></div>

        <!-- <hr v-if="surround?.length" /> -->

        <!-- <UDocsSurround :surround="surround" /> -->
      </UPageBody>

      <template #right>
        <UDocsToc
          v-if="post.body && post.body.toc"
          :links="post.body.toc.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>
