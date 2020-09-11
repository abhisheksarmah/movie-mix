<template>
	<div>
		<div class="relative mt-3 md:mt-0">
			<input
				type="text"
				class="bg-gray-800 rounded-full w-64 px-4 pl-8 py-2
      focus:outline-none focus:shadow-outline search-box"
				placeholder="Search (Press '/' to focus)"
				v-model="searchQuery"
				ref="search"
				@keydown.esc="isOpen = false"
				@focus="isOpen = true"
				@keydown.shift.tab="isOpen = false"
			/>
			<div class="absolute top-0">
				<span class="text-gray-500">
					<icon
						name="search"
						class="mt-3 ml-3"
					/>
				</span>
			</div>
			<div
				class="absolute top-0 right-0"
				v-if="isCalculating"
			>
				<icon
					name="spinner"
					class="mt-3 mr-2 h-4 w-4"
				/>
			</div>
			<div
				class="z-50 absolute bg-gray-800 rounded w-64 mt-4 text-sm search-list-container"
				v-if="searchQuery.length >= 3 && isOpen && !isCalculating && !searchQueryIsDirty"
				v-closable="{ exclude: ['search'], handler: 'onClose' }"
			>
				<ul
					v-if="shows.length > 0"
					class="show-list"
				>
					<template v-for="(show, index) in shows">
						<li
							:key="show.id"
							class="border-b border-gray-700"
							@keydown.tab.exact="index + 1 == shows.length ? (isOpen = false) : ''"
						>
							<router-link
								:to="{
								name: 'ShowDetails',
								params: { id: show.id },
								}"
								class="hover:bg-gray-700 p-3 flex items-center"
							>
								<div class="w-1/6 h-12 flex-shrink-0 bg-gray-700">
									<card-image
										:image-url="show.image.medium || show.image.original"
										v-if="show.image"
									/>
								</div>
								<span class="ml-4 truncate">{{ show.name }}</span>
							</router-link>
						</li>
					</template>
				</ul>
				<div
					v-else
					class="p-3"
				>
					No results for "{{ searchQuery }}"
				</div>
				<!-- <div v-else-if="isCalculating && searchQueryIsDirty">
					asdasdas
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import Icon from "@/components/Icon";
import { searchShows } from "../api";
import { debounce } from "lodash";
import CardImage from "@/components/Image";

export default {
	name: "Search",
	components: {
		Icon,
		CardImage,
	},
	data() {
		return {
			isOpen: true,
			searchQuery: "",
			searchQueryIsDirty: false,
			isCalculating: false,
			shows: [],
		};
	},
	created() {
		window.addEventListener("keydown", this.keyDown);
	},
	watch: {
		searchQuery(newValue) {
			this.searchQueryIsDirty = true;
			if (newValue.length >= 3) {
				this.searchData();
			}
		},
	},
	methods: {
		keyDown: function (event) {
			console.log(event);
			if (event.keyCode == 191) {
				event.preventDefault();
				this.$refs.search.focus();
			}
		},
		searchData: debounce(function () {
			this.isCalculating = true;
			searchShows(this.searchQuery).then(({ data }) => {
				this.isCalculating = false;
				this.searchQueryIsDirty = false;
				this.shows = data.map((show) => show.show);
			});
		}, 500),
		onClose() {
			this.isOpen = false;
		},
	},
};
</script>
