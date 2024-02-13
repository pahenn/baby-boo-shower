<script setup lang="ts">
  const title = "Boo's Log"
  const description = "A Blog about our journey with Boo."

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  })

  defineOgImage({
    component: "Baby Boo",
    title,
    description,
  })

  const { $directus, $readItems } = useNuxtApp()

  const { data: posts } = await useAsyncData("posts", () => {
    return $directus.request(
      $readItems("posts", {
        // fields: ["*", { "*": ["*"] }],
        sort: "-date_published",
        filter: {
          status: "published",
        },
      })
    )
  })
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="title"
      :description="description"
      class="py-[50px]"
    />
    <UPageBody>
      <UBlogList>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="`/blog/${post.slug}`"
          :title="post.title"
          :description="post.description"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2',
          }"
          :image="{
            provider: 'directus',
            src: post.image,
            alt: post.title,
            modifiers: { key: 'scaled' },
          }"
          :date="
            new Date(post.date_published).toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          "
          :badge="{ label: post.tags[0] }"
          prefetch
        >
          <template #badge>
            <div class="flex gap-2">
              <div
                v-for="tag in post.tags"
                :key="tag"
              >
                <UBadge
                  :label="tag"
                  variant="outline"
                />
              </div>
            </div>
          </template>
        </UBlogPost>
      </UBlogList>
    </UPageBody>
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
