<template>
  <div class="home">
    <div class="container mx-auto px-4 pt-16">
      <div class="popular-movies pb-16">
        <h2
          class="uppercase tracking-wider text-orange-500 text-lg font-semibold"
        >
          Popular Movies
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          <show-card
            v-for="show in populars"
            :key="show.id"
            :show="show"
          ></show-card>
        </div>
      </div>
      <div class="genres pb-16" v-for="genre in genres" :key="genre.name">
        <h2
          class="uppercase tracking-wider text-orange-500 text-lg font-semibold"
        >
          {{ genre.name }}
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          <show-card
            v-for="show in genre.shows.slice(-10)"
            :key="show.id"
            :show="show"
          ></show-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/views/show/Card";

export default {
  name: "Home",
  components: {
    ShowCard,
  },
  data() {
    return {
      shows: [],
      populars: [],
    };
  },
  created() {
    fetch("http://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => {
        this.shows = data;
        this.populars = this.shows.slice(-10);
      });
  },
  computed: {
    genreTitles() {
      return Array.from(new Set(this.shows.flatMap((shows) => shows.genres)));
    },
    genres() {
      return this.genreTitles.map((genre) => {
        return {
          name: genre,
          shows: this.shows.filter((show) => show.genres.includes(genre)),
        };
      });
    },
  },
};
</script>