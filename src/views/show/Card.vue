<template>
  <div class="mt-8">
    <router-link
      :to="{
        name: 'ShowDetails',
        params: { id: show.id },
      }"
    >
      <img
        :src="show.image.medium"
        alt=""
        class="hover:opacity-75 text-sm transition ease-in-out duration-150"
      />
    </router-link>
    <div class="mt-2">
      <router-link
        :to="{
          name: 'ShowDetails',
          params: { id: show.id },
        }"
        class="text-lg mt-2 hover:text-gray-300"
        >{{ show.name }}
      </router-link>
      <div class="flex items-center text-gray-400 text-sm mt-1">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-orange-500 w-4"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
            <path
              fill="currentColor"
              d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
            ></path>
          </svg>
        </span>
        <span class="ml-1">{{ show.rating.average }}</span>
        <span class="mx-2">|</span>
        <span>{{ show.premiered }}</span>
      </div>
      <div class="text-gray-400 text-sm">
        {{ show.genres.join(", ") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
};
</script>

<style lang="scss" scoped></style>
