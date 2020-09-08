<template>
	<div class="home">
		<div class="container mx-auto px-4 pt-16">
			<div class="pb-16">
				<h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
					Popular Movies
				</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 popular-movies">
					<template v-if="!loading">
						<show-card
							v-for="show in populars"
							:key="show.id"
							:show="show"
						></show-card>
					</template>
					<template v-else>
						<placeholder
							v-for="i in 10"
							:key="i"
						/>
					</template>
				</div>
			</div>
			<div
				class="genres pb-16"
				v-for="genre in genres"
				:key="genre.name"
			>
				<h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold genre-category">
					{{ genre.name }}
				</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
					<show-card
						v-for="show in genre.shows"
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
import Placeholder from "@/views/show/Placeholder";
import { getAllShows } from "@/api";

export default {
	name: "Home",
	components: {
		ShowCard,
		Placeholder,
	},
	data() {
		return {
			shows: [],
			populars: [],
			loading: false,
		};
	},
	mounted() {
		this.loading = true;
		getAllShows().then(({ data }) => {
			this.loading = false;
			this.shows = data;
			this.populars = this.mostlyRatedShows(this.shows);
		});
	},
	computed: {
		genreTitles() {
			return Array.from(
				new Set(this.shows.flatMap((shows) => shows.genres))
			);
		},
		genres() {
			return this.genreTitles.map((genre) => {
				return {
					name: genre,
					shows: this.mostlyRatedShows(
						this.shows.filter((show) => show.genres.includes(genre))
					),
				};
			});
		},
	},
	methods: {
		mostlyRatedShows(shows) {
			return shows
				.filter((show) => show.rating.average)
				.sort((a, b) => (a.rating.average < b.rating.average ? 1 : -1))
				.slice(0, 10);
		},
	},
};
</script>
