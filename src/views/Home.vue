<template>
	<div class="home">
		<div class="container mx-auto px-4 pt-16">
			<template v-if="populars.length > 0">
				<div class="pb-16">
					<h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
						Popular Movies
					</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 popular-movies">
						<show-card
							v-for="show in populars"
							:key="show.id"
							:show="show"
						></show-card>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="pb-16">
					<content-placeholders>
						<content-placeholders-text :lines="1" />
					</content-placeholders>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
						<content-placeholders
							v-for="i in 10"
							:key="i"
							class="mt-8"
						>
							<content-placeholders-img style="height:20rem !important;" />
							<content-placeholders-text :lines="2" />
						</content-placeholders>
					</div>
				</div>
			</template>
			<template v-if="genres.length > 0">
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
			</template>
			<template v-else>
				<div
					class="genres pb-16"
					v-for="i in 5"
					:key="i"
				>
					<content-placeholders>
						<content-placeholders-text :lines="1" />
					</content-placeholders>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
						<content-placeholders
							v-for="i in 10"
							:key="i"
							class="mt-8"
						>
							<content-placeholders-img style="height:20rem !important;" />
							<content-placeholders-text :lines="2" />
						</content-placeholders>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import ShowCard from "@/views/show/Card";
import { getAllShows } from "@/api";

export default {
	name: "Home",
	components: {
		ShowCard,
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
