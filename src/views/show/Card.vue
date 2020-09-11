<template>
	<div class="mt-8">
		<router-link :to="{
        name: 'ShowDetails',
        params: { id: show.id },
      }">
			<div class="h-80">
				<card-image :image-url="show.image.medium || show.image.original" />
			</div>
		</router-link>
		<div class="mt-2">
			<router-link
				:to="{
          name: 'ShowDetails',
          params: { id: show.id },
        }"
				class="text-lg mt-2 hover:text-gray-300 show-name"
			>{{ show.name }}
			</router-link>
			<div class="flex items-center text-gray-400 text-sm mt-1">
				<span class="text-orange-500">
					<icon name="star" />
				</span>
				<span class="ml-1 show-average">{{ show.rating.average }}</span>
				<span class="mx-2">|</span>
				<span class="show-premiered">{{ show.premiered }}</span>
			</div>
			<div class="text-gray-400 text-sm show-genres">
				{{ show.genres.join(", ") }}
			</div>
		</div>
	</div>
</template>

<script>
import Icon from "@/components/Icon";
import CardImage from "@/components/Image";

export default {
	props: ["show"],
	components: {
		Icon,
		CardImage,
	},
};
</script> 
