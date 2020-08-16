<template>
  <div id="app">
    <nav class="border-b border-gray-800">
      <div
        class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6"
      >
        <ul class="flex flex-col md:flex-row items-center">
          <li>
            <router-link to="/" class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-movie w-12"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <line x1="8" y1="4" x2="8" y2="20"></line>
                <line x1="16" y1="4" x2="16" y2="20"></line>
                <line x1="4" y1="8" x2="8" y2="8"></line>
                <line x1="4" y1="16" x2="8" y2="16"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="16" y1="8" x2="20" y2="8"></line>
                <line x1="16" y1="16" x2="20" y2="16"></line>
              </svg>
              <span class="text-2xl font-bold ml-3">TV App</span>
            </router-link>
          </li>
          <li class="md:ml-16 mt-3 md:mt-0">
            <a href="#" class="hover:text-gray-300">Movies</a>
          </li>
          <li class="md:ml-6 mt-3 md:mt-0">
            <a href="#" class="hover:text-gray-300">TV shows</a>
          </li>
          <li class="md:ml-6 mt-3 md:mt-0">
            <a href="#" class="hover:text-gray-300">Actors</a>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-search text-gray-500 w-4 mt-3 ml-3"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
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
