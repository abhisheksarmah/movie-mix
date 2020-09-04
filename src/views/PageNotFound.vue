<template>
	<div>
		<div class="container mx-auto px-4 pt-16 flex-1">
			<div class="flex flex-col items-center mt-16">
				<icon
					name="not-found"
					class="text-gray-300"
				/>
				<h2 class="font-semibold text-2xl tracking-wide text-gray-300">Page you are looking for could not be found</h2>
			</div>
		</div>
	</div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
	components: {
		Icon,
	},
};
</script>

<style lang="scss" scoped>
</style>