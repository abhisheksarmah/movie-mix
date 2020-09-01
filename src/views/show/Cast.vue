<template>
	<div class="mt-8">
		<a
			:href="cast.character.url"
			target="_blank"
		>
			<template v-if="cast.character.image">
				<img
					:src="cast.character.image.medium || cast.character.image.original"
					:alt="cast.character.name"
					class="hover:opacity-75 text-sm transition ease-in-out duration-150 cast-character-image w-full"
				/>
			</template>
			<template v-else-if="cast.person.image">
				<img
					:src="cast.person.image.medium || cast.person.image.original"
					:alt="cast.person.name"
					class="hover:opacity-75 text-sm transition ease-in-out duration-150 cast-character-image w-full"
				/>
			</template>
			<template v-else>
				<div class="bg-gray-800 h-80 hover:opacity-75 text-sm transition ease-in-out duration-150"></div>
			</template>
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
export default {
	name: "ShowCasts",
	props: ["cast"],
};
</script> 