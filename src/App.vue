<template>
  <div id="app">
    <nav class="border-b border-gray-800">
      <div
        class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6"
      >
        <ul class="flex flex-col md:flex-row items-center">
          <li>
            <router-link to="/" class="flex items-center">
              <icon name="logo" />
              <span class="text-2xl font-semibold ml-3 tracking-wider"
                >Movie Mix</span
              >
            </router-link>
          </li>
        </ul>
        <div class="flex flex-col md:flex-row items-center">
          <search />
          <div class="md:ml-4 mt-3 md:mt-0">
            <a href="#">
              <img
                src="./assets/avatar.jpg"
                alt=""
                class="w-8 h-8 rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import Search from "@/views/Search";

export default {
  name: "App",
  components: {
    Icon,
    Search,
  },
};
</script>

<style lang="css">
.vue-content-placeholders-img {
  @apply bg-gray-800 !important;
}
.vue-content-placeholders-text__line {
  @apply bg-gray-800 !important;
}
.vue-content-placeholders-is-animated .vue-content-placeholders-img::before {
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.15) 15%,
    transparent 30%
  ) !important;
}
.vue-content-placeholders-is-animated
  .vue-content-placeholders-text__line::before {
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.15) 15%,
    transparent 30%
  ) !important;
}
</style>
