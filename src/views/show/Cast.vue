<template>
	<div class="mt-8">
		<a
			:href="cast.character.url"
			target="_blank"
		>
			<div class="h-80">
				<card-image :image-url="castImage" />
			</div>
		</a>
		<div class="mt-2">
			<a
				:href="cast.person.url"
				target="_blank"
				class="text-lg mt-2 hover:text-gray-300 cast-person-name"
			>{{ cast.person.name }}</a>
			<div class="text-gray-400 text-sm">
				as <a
					:href="cast.character.url"
					target="_blank"
					class="hover:text-gray-300 cast-character-name"
				>{{ cast.character.name }}</a>
			</div>
		</div>
	</div>
</template>

<script>
import CardImage from "@/components/Image";

export default {
	name: "ShowCasts",
	props: ["cast"],
	components: {
		CardImage,
	},
	computed: {
		castImage() {
			if (this.cast.character.image) {
				return (
					this.cast.character.image.medium ||
					this.cast.character.image.original
				);
			}
			if (this.cast.person.image) {
				return (
					this.cast.person.image.medium ||
					this.cast.person.image.original
				);
			}
			return null;
		},
	},
};
</script> 