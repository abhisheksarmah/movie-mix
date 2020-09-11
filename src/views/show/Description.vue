<template>
  <div class="flex flex-col md:flex-row">
    <div class="sm:w-64 md:w-64 lg:w-96 flex-none">
      <img
        :src="show.image.medium || show.image.original"
        :alt="show.name"
        class="w-full show-image"
      />
    </div>
    <div class="md:ml-24">
      <h2 class="text-4xl font-semibold show-name">{{ show.name }}</h2>
      <div class="flex items-center text-gray-400 text-sm mt-1 flex-wrap">
        <span class="text-orange-500">
          <icon name="star" />
        </span>
        <span class="ml-1 show-average">{{ show.rating.average }}</span>
        <span class="mx-2">|</span>
        <span class="show-premiered">{{ show.premiered }}</span>
        <span class="mx-2">|</span>
        <span class="show-genres">{{ show.genres.join(", ") }}</span>
      </div>
      <div>
        <p class="text-gray-300 mt-8 show-summary" v-html="show.summary"></p>
      </div>
      <div class="mt-12">
        <button
          class="flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
        >
          <icon name="play" />
          <span class="ml-2">Play Trailer</span>
          <icon name="spinner" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "showDescription",
  props: ["show"],
  components: {
    Icon,
  },
};
</script>
