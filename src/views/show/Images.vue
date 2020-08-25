<template>
	<div class="mt-8">
		<a
			:href="image.url"
			target="_blank"
		>
			<img
				:src="image.url"
				:alt="image.id"
				class="hover:opacity-75 text-sm transition ease-in-out duration-150 show-images"
			/>
		</a>
	</div>
</template>

<script>
export default {
	props: ["image"],
};
</script> 