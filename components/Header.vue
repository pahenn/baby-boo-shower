<script setup lang="ts">
  import type { NavItem } from "@nuxt/content/dist/runtime/types"

  // const navigation = inject<Ref<NavItem[]>>("navigation", ref([]))

  const links = [
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
        label="Coming July 2024"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <!-- <template #right>
      <UButton
        label="Log in"
        color="gray"
        to="/login"
      />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      />
    </template> -->
    )
    <template #panel>
      <UNavigationTree
        :links
        default-open
      />
    </template>
  </UHeader>
</template>
