<template>
  <div class="details" v-if="!loading">
    <div class="movie-info border-b border-gray-800">
      <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
        <img
          :src="show.image.medium || show.image.original"
          alt=""
          class="w-96"
        />
        <div class="md:ml-24">
          <h2 class="text-4xl font-semibo">{{ show.name }}</h2>
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
            <span class="mx-2">|</span>
            <span>{{ show.genres.join(", ") }}</span>
          </div>
          <div>
            <p
              class="text-gray-300 mt-8"
              v-html="show.summary"
              style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
            ></p>
          </div>
          <div class="mt-12">
            <button
              class="flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon></svg
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-play-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <span class="ml-2">Play Trailer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cast-info border-b border-gray-800">
      <div class="container mx-auto px-4 py-16">
        <div class="popular-movies">
          <h2 class="text-4xl font-semibold">
            Cast
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            <div class="mt-8" v-for="(cast, index) in casts" :key="index">
              <a :href="cast.character.url">
                <img
                  :src="cast.person.image.medium || cast.person.image.original"
                  alt=""
                  class="hover:opacity-75 text-sm transition ease-in-out duration-150"
                />
              </a>
              <div class="mt-2">
                <a
                  :href="cast.character.url"
                  class="text-lg mt-2 hover:text-gray-300"
                  >{{ cast.person.name }}
                </a>
                <div class="text-gray-400 text-sm">
                  as {{ cast.character.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="movie-images border-b border-gray-800">
      <div class="container mx-auto px-4 py-16">
        <div class="popular-movies">
          <h2 class="text-4xl font-semibold">
            Images
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            <div class="mt-8" v-for="image in images" :key="image.id">
              <a href="#">
                <img
                  :src="image.url"
                  alt=""
                  class="hover:opacity-75 text-sm transition ease-in-out
                duration-150"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      casts: [],
      images: [],
      show: {},
      loading: true,
    };
  },
  mounted() {},
  created() {
    let urls = [
      `http://api.tvmaze.com/shows/${this.$route.params.id}`,
      `http://api.tvmaze.com/shows/${this.$route.params.id}/cast`,
      `http://api.tvmaze.com/shows/${this.$route.params.id}/images`,
    ];
    this.loading = true;
    Promise.all(urls.map((url) => fetch(url)))
      .then((resp) => Promise.all(resp.map((r) => r.json())))
      .then((result) => {
        this.loading = false;
        this.show = result[0];
        this.casts = result[1];
        this.images = result[2]
          .filter((image) => image.type == "poster")
          .map((image) => {
            return {
              id: image.id,
              ...(image.resolutions.medium || image.resolutions.original),
            };
          });
      });
  },
};
</script>
