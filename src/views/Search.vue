<template>
  <div>
    <div class="relative mt-3 md:mt-0">
      <input
        type="text"
        class="bg-gray-800 rounded-full w-64 px-4 pl-8 py-2
      focus:outline-none focus:shadow-outline"
        placeholder="Search (Press '/' to focus)"
        v-model="searchQuery"
        ref="search"
        @keydown.esc="isOpen = false"
        @focus="isOpen = true"
        @keydown.shift.tab="isOpen = false"
      />
      <div class="absolute top-0">
        <span class="text-gray-500">
          <icon name="search" class="mt-3 ml-3" />
        </span>
      </div>
      <div
        class="z-50 absolute bg-gray-800 rounded w-64 mt-4 text-sm"
        v-if="searchQuery.length >= 3 && isOpen"
        v-closable="{ exclude: ['search'], handler: 'onClose' }"
      >
        <ul v-if="shows.length > 0" class="show-list">
          <template v-for="(show, index) in shows">
            <li
              :key="show.id"
              class="border-b border-gray-700"
              @keydown.tab.exact="
                index + 1 == shows.length ? (isOpen = false) : ''
              "
            >
              <router-link
                :to="{
                  name: 'ShowDetails',
                  params: { id: show.id },
                }"
                class="hover:bg-gray-700 p-3 flex items-center"
              >
                <img
                  :src="show.image.medium || show.image.original"
                  :alt="show.name"
                  v-if="show.image"
                  class="w-10"
                />
                <div v-else class="w-10 h-12 bg-gray-700"></div>
                <span class="ml-4">{{ show.name }}</span>
              </router-link>
            </li>
          </template>
        </ul>
        <div
          v-else-if="shows.length <= 0 && !isCalculating && !searchQueryIsDirty"
          class="p-3"
        >
          No results for "{{ searchQuery }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { searchShows } from "../api";
import { debounce } from "lodash";

export default {
  name: "Search",
  components: {
    Icon,
  },
  data() {
    return {
      isOpen: true,
      searchQuery: "",
      searchQueryIsDirty: false,
      isCalculating: false,
      shows: [],
    };
  },
  mounted() {
    var vm = this;
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 191) {
        event.preventDefault();
        vm.$refs.search.focus();
      }
    });
  },
  watch: {
    searchQuery(newValue) {
      this.searchQueryIsDirty = true;
      if (newValue.length >= 3) {
        this.searchData();
      }
    },
  },
  methods: {
    searchData: debounce(function() {
      this.isCalculating = true;
      searchShows(this.searchQuery).then(({ data }) => {
        this.isCalculating = false;
        this.searchQueryIsDirty = false;
        this.shows = data.map((show) => show.show);
      });
    }, 500),
    onClose() {
      this.isOpen = false;
    },
  },
};
</script>
