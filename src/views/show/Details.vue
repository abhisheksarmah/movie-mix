<template>
  <div class="details">
    <div class="container mx-auto px-4 py-16">
      <button
        class="p-2 border border-gray-500 text-gray-500 rounded-full shadow-md hover:border-gray-100 hover:text-gray-100 back-button"
        @click="$router.go(-1)"
      >
        <icon name="back" />
      </button>
    </div>
    <div class="movie-info border-b border-gray-800">
      <div class="container mx-auto px-4 pb-16 flex flex-col md:flex-row">
        <template v-if="!loading && Object.keys(show).length > 0">
          <show-description :show="show" />
        </template>
        <template v-else>
          <div class="flex flex-col md:flex-row w-full">
            <div class="sm:w-64 md:w-64 lg:w-96 flex-none">
              <content-placeholders>
                <content-placeholders-img
                  style="height:28rem !important;width:24rem !important;"
                />
              </content-placeholders>
            </div>
            <div class="md:ml-24 w-full flex flex-col justify-around">
              <content-placeholders>
                <content-placeholders-text :lines="7" />
              </content-placeholders>
              <content-placeholders>
                <content-placeholders-text
                  :lines="1"
                  style="width:16rem !important; height: 4rem !important;"
                />
              </content-placeholders>
            </div>
          </div>
        </template>
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
            <template v-if="!loading && casts.length > 0">
              <show-cast
                v-for="(cast, index) in casts"
                :key="index"
                :cast="cast"
              />
            </template>
            <template v-else>
              <content-placeholders class="mt-8" v-for="i in 10" :key="i">
                <content-placeholders-img style="height:20rem !important;" />
                <content-placeholders-text :lines="2" />
              </content-placeholders>
            </template>
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
            <template v-if="!loading && images.length > 0">
              <show-image
                v-for="image in images"
                :key="image.id"
                :image="image"
              />
            </template>
            <template v-else>
              <content-placeholders class="mt-8" v-for="i in 10" :key="i">
                <content-placeholders-img style="height:20rem !important;" />
                <content-placeholders-text :lines="2" />
              </content-placeholders>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import ShowDescription from "./Description";
import ShowImage from "./Images";
import ShowCast from "./Cast";
import { getShowDetails, getShowCasts, getShowImages } from "@/api";

export default {
  name: "ShowDetails",
  components: {
    Icon,
    ShowDescription,
    ShowImage,
    ShowCast,
  },
  data() {
    return {
      casts: [],
      images: [],
      show: {},
      loading: true,
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.showDetails(to.params.id);
    next();
  },
  created() {
    this.showDetails(this.$route.params.id);
  },
  methods: {
    formatImages(data) {
      return data
        .filter((image) => image.type == "poster")
        .map((image) => {
          let { url } = image.resolutions.medium || image.resolutions.original;
          return {
            id: image.id,
            url,
          };
        });
    },
    showDetails(showId) {
      this.loading = true;
      getShowDetails(showId)
        .then(({ data }) => {
          let { id, image, name, rating, premiered, genres, summary } = data;

          Object.assign(this.show, {
            id,
            image,
            name,
            rating,
            premiered,
            genres,
            summary,
          });
          getShowCasts(showId).then(({ data }) => {
            this.casts = data;
            getShowImages(showId).then(({ data }) => {
              this.images = this.formatImages(data);
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
