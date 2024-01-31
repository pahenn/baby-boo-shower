<script lang="ts" setup>
  import { z } from "zod"

  const state = ref({
    name: "",
    email: "",
    // additionalGuests: [],
  })

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    // additionalGuests: z
    //   .array(
    //     z.object({
    //       name: z.string(),
    //       email: z.string().email().optional(),
    //     })
    //   )
    //   .optional(),
  })

  type Schema = z.infer<typeof schema>

  const loading = ref(false)

  const submit = async (event: Schema) => {
    try {
      loading.value = true
      console.log("Submitting...")
      console.log("RsvpForm.vue:submit:event => ", event)
      const { data } = await useFetch("/api/appendToSheet", {
        method: "POST",
        body: JSON.stringify(event.data),
      })
    } catch (error) {
      console.log("RsvpForm.vue:submit:error => ", error)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <UForm
    :state
    :schema
    @submit="submit"
    class="space-y-2"
  >
    <UFormGroup
      name="name"
      label="Name"
    >
      <UInput
        v-model="state.name"
        required
      />
    </UFormGroup>
    <UFormGroup
      name="email"
      label="Email"
    >
      <UInput
        v-model="state.email"
        required
      />
    </UFormGroup>
    <!-- <div v-if="state.additionalGuests.length > 0">
      <div class="text-sm font-semibold mb-2">Additional guests</div>
      <div class="space-y-4">
        <div
          v-for="(guest, index) in state.additionalGuests"
          :key="index"
          class="flex pl-1 border-l-2 border-gray-200"
        >
          <UButton
            variant="ghost"
            @click="state.additionalGuests.splice(index, 1)"
          >
            <Icon
              name="heroicons:trash"
              size="20"
            />
          </UButton>
          <div class="space-y-1 w-full">
            <UFormGroup :name="`additionalGuests.${index}.name`">
              <UInput
                v-model="guest.name"
                placeholder="Name"
                required
              />
            </UFormGroup>
            <UFormGroup :name="`additionalGuests.${index}.email`">
              <UInput
                v-model="guest.email"
                placeholder="Email - optional, we'll send them an email too!"
              />
            </UFormGroup>
          </div>
        </div>
      </div>
    </div> -->
    <div class="flex justify-between">
      <!-- <UButton
        label="Add guest"
        @click="state.additionalGuests.push({ name: '', email: '' })"
      /> -->
      <UButton
        type="submit"
        label="RSVP"
        :loading
      />
    </div>
  </UForm>
</template>
