<template>
	<div id="app">
		<nav class="border-b border-gray-800">
			<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6">
				<ul class="flex flex-col md:flex-row items-center">
					<li>
						<router-link
							to="/"
							class="flex items-center"
						>
							<icon name="logo" />
							<span class="text-2xl font-semibold ml-3 tracking-wider">Movie Mix</span>
						</router-link>
					</li>
				</ul>
				<div class="flex flex-col md:flex-row items-center">
					<search />
					<div class="md:ml-4 mt-3 md:mt-0">
						<a href="#">
							<img
								src="./assets/avatar.jpg"
								alt=""
								class="w-8 h-8 rounded-full"
							/>
						</a>
					</div>
				</div>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
import Icon from "@/components/Icon";
import Search from "@/views/Search";

export default {
	name: "App",
	components: {
		Icon,
		Search,
	},
};
</script>
