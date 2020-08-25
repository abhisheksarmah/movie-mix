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
							<span class="text-2xl font-bold ml-3">TV App</span>
						</router-link>
					</li>
					<li class="md:ml-16 mt-3 md:mt-0">
						<a
							href="#"
							class="hover:text-gray-300"
						>Movies</a>
					</li>
					<li class="md:ml-6 mt-3 md:mt-0">
						<a
							href="#"
							class="hover:text-gray-300"
						>TV shows</a>
					</li>
					<li class="md:ml-6 mt-3 md:mt-0">
						<a
							href="#"
							class="hover:text-gray-300"
						>Actors</a>
					</li>
				</ul>
				<div class="flex flex-col md:flex-row items-center">
					<div class="relative mt-3 md:mt-0">
						<input
							type="text"
							class="bg-gray-800 rounded-full w-64 px-4 pl-8 py-2 focus:outline-none focus:shadow-outline"
							placeholder="Search"
						/>
						<div class="absolute top-0">
							<span class="text-gray-500">
								<icon
									name="search"
									class="mt-3 ml-3"
								/>
							</span>
						</div>
					</div>
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

export default {
	name: "App",
	components: {
		Icon,
	},
};
</script>
