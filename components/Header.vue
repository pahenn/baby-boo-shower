<script setup lang="ts">
  const links = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Our Story",
      to: "/our-story/about-us",
    },
    {
      label: "Registry",
      to: "/registry",
    },
    {
      label: "Diaper Raffle",
      to: "/diaper",
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
