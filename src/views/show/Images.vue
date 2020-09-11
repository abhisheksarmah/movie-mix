<template>
	<div class="mt-8">
		<a
			:href="image.url"
			target="_blank"
		>
			<div class="h-80">
				<card-image :image-url="image.url" />
			</div>
		</a>
	</div>
</template>

<script>
import CardImage from "@/components/Image";

export default {
	props: ["image"],
	components: {
		CardImage,
	},
};
</script> 