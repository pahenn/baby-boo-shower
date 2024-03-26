<script setup lang="ts">
  const links = [
    {
      label: "Baby Shower",
      to: "/",
    },
    {
      label: "Registry",
      to: "/registry",
    },
    {
      label: "Diaper Raffle",
      to: "/diaper-raffle",
    },
    {
      label: "Our Story",
      to: "/our-story/about-us",
    },
    {
      label: "Boo's Log",
      to: "/blog",
    },
  ]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Baby Boo
      <UBadge
        label="Coming June 2024"
        variant="subtle"
        class="mb-0.5"
      />
    </template>
    <template #panel>
      <UNavigationTree
        :links="links"
        default-open
      />
    </template>
  </UHeader>
</template>
