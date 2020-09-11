<template>
	<div
		class="hover:opacity-75 text-sm transition ease-in-out duration-150 show-image w-full h-full bg-gray-700"
		:style="{
				backgroundImage: 'url('+ImageUrl+')',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'cover'
			}"
	></div>
</template>

<script>
export default {
	props: ["ImageUrl"],
};
</script>

<style lang="scss" scoped>
</style>