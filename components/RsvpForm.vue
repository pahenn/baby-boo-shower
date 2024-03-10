<script lang="ts" setup>
  import { z } from "zod"
  import { format } from "@formkit/tempo"

  const answers = ["Yes", "No"]

  const state = ref({
    name: "",
    email: "",
    response: ref(""),
    additionalGuests: [],
  })

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    response: z.string(),
    additionalGuests: z
      .array(
        z.object({
          name: z.string(),
          email: z.string().email().optional(),
        })
      )
      .optional(),
  })

  type Schema = z.infer<typeof schema>

  const loading = ref(false)
  const submitted = ref(false)

  const flatten_rsvp = (rsvp: Schema) => {
    const date = format({
      date: new Date(),
      format: "MMMM D",
      tz: "America/New_York",
    })
    const rsvps = []
    const { name: rsvp_name, email: rsvp_email, response } = rsvp
    rsvps.push({
      rsvp: response,
      name: rsvp_name,
      email: rsvp_email,
      rsvp_name,
      rsvp_email,
      date: date,
    })
    const { additionalGuests } = rsvp
    if (!additionalGuests) return rsvps

    const guests = additionalGuests.map((guest) => {
      const { name, email } = guest
      return {
        rsvp: response,
        name,
        email,
        rsvp_name,
        rsvp_email,
        date: date,
      }
    })
    return rsvps.concat(guests)
  }

  const submit = async (event: Schema) => {
    try {
      loading.value = true
      console.log("Submitting...")
      for (const rsvp of flatten_rsvp(event.data)) {
        // console.log("RsvpForm.vue:submit:rsvp => ", rsvp)
        const { data } = await useFetch("/api/appendToSheet", {
          method: "POST",
          body: JSON.stringify(rsvp),
        })
      }
      submitted.value = true
      state.value = ref({
        name: "",
        email: "",
        response: ref(""),
        additionalGuests: [],
      })
    } catch (error) {
      console.log("RsvpForm.vue:submit:error => ", error)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div v-if="submitted">
    <div class="text-2xl font-semibold text-center">
      Thank you for your RSVP!
    </div>
  </div>
  <UForm
    v-else
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
    <UFormGroup
      name="answer"
      label="RSVP"
    >
      <UInputMenu
        v-model="state.response"
        :options="answers"
        required
      />
    </UFormGroup>
    <div v-if="state.additionalGuests.length > 0">
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
    </div>
    <div class="flex justify-between">
      <UButton
        label="Add guest"
        @click="state.additionalGuests.push({ name: '', email: '' })"
      />
      <div class="flex gap-4">
        <UButton
          type="submit"
          label="RSVP"
          variant="outline"
          :loading
        />
      </div>
    </div>
  </UForm>
</template>
