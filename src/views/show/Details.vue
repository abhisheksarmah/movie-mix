<template>
	<div
		class="details"
		v-if="!loading"
	>
		<div class="movie-info border-b border-gray-800">
			<div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
				<show-description :show="show" />
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
import { getShowDetails, getShowCasts, getShowImages } from "@/api";

export default {
	name: "ShowDetails",
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
	beforeRouteUpdate(to, from, next) {
		this.showDetails(to.params.id);
		next();
	},
	created() {
		this.showDetails(this.$route.params.id);
	},
	methods: {
		showDetails(showId) {
			this.loading = true;
			getShowDetails(showId)
				.then(({ data }) => {
					let {
						id,
						image,
						name,
						rating,
						premiered,
						genres,
						summary,
					} = data;

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
							this.images = data
								.filter((image) => image.type == "poster")
								.map((image) => {
									return {
										id: image.id,
										...(image.resolutions.medium ||
											image.resolutions.original),
									};
								});
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
