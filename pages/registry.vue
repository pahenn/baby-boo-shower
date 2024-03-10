<script setup lang="ts">
  const { data: page } = await useAsyncData("registry", () =>
    queryContent("/registry").findOne()
  )
  if (!page.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    })
  }

  useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
  })

  const isYearly = ref(false)
</script>

<template>
  <div v-if="page">
    <UContainer>
      <UPageHero
        v-for="hero in page.hero"
        v-bind="hero"
      >
      </UPageHero>

      <UPricingGrid>
        <UPricingCard
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
        />
      </UPricingGrid>
    </UContainer>
  </div>
</template>
