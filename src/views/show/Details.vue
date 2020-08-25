<template>
	<div
		class="details"
		v-if="!loading"
	>
		<div class="movie-info border-b border-gray-800">
			<div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
				<show-description :show="show"/>
			</div>
		</div>
		<div class="cast-info border-b border-gray-800">
			<div class="container mx-auto px-4 py-16">
				<div class="popular-movies">
					<h2 class="text-4xl font-semibold">
						Cast
					</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
						<show-cast
							v-for="(cast, index) in casts"
							:key="index"
							:cast="cast"
						/>
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
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
						<show-image
							v-for="image in images"
							:key="image.id"
							:image="image"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ShowDescription from "./Description";
import ShowImage from "./Images";
import ShowCast from "./Cast";

export default {
	components: {
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
							...(image.resolutions.medium ||
								image.resolutions.original),
						};
					});
			});
	},
};
</script>
