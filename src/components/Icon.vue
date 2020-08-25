<template>
	<div>
		<template v-if="name == 'star'">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect
					x="0"
					y="0"
					width="24"
					height="24"
					stroke="none"
				></rect>
				<path
					fill="currentColor"
					d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
				></path>
			</svg>
		</template>
		<template v-else-if="name =='play'">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-4"
			>
				<circle
					cx="12"
					cy="12"
					r="10"
				></circle>
				<polygon points="10 8 16 12 10 16 10 8"></polygon>
			</svg>
		</template>
		<template v-else-if="name == 'search'">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-4"
			>
				<circle
					cx="11"
					cy="11"
					r="8"
				></circle>
				<line
					x1="21"
					y1="21"
					x2="16.65"
					y2="16.65"
				></line>
			</svg>
		</template>
		<template v-else-if="name == 'logo'">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-12"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect
					x="0"
					y="0"
					width="24"
					height="24"
					stroke="none"
				></rect>
				<rect
					x="4"
					y="4"
					width="16"
					height="16"
					rx="2"
				></rect>
				<line
					x1="8"
					y1="4"
					x2="8"
					y2="20"
				></line>
				<line
					x1="16"
					y1="4"
					x2="16"
					y2="20"
				></line>
				<line
					x1="4"
					y1="8"
					x2="8"
					y2="8"
				></line>
				<line
					x1="4"
					y1="16"
					x2="8"
					y2="16"
				></line>
				<line
					x1="4"
					y1="12"
					x2="20"
					y2="12"
				></line>
				<line
					x1="16"
					y1="8"
					x2="20"
					y2="8"
				></line>
				<line
					x1="16"
					y1="16"
					x2="20"
					y2="16"
				></line>
			</svg>
		</template>
	</div>
</template>

<script>
export default {
	name: "Icon",
	props: ["name", "classes"],
};
</script>

<style lang="scss" scoped>
</style>