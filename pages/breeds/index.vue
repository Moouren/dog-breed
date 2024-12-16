<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold dark:text-white">Dog Breeds Directory</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Explore our comprehensive collection of dog breeds
      </p>
    </div>

    <div class="mb-8">
      <UInput
        v-model="searchQuery"
        placeholder="Search breeds..."
        icon="i-heroicons-magnifying-glass"
        class="max-w-md"
        :disabled="isLoading"
      />

      <div v-if="error" class="mt-4 text-red-500">
        {{ error.message }}
      </div>
    </div>

    <div
      v-if="isLoading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="bg-gray-100 dark:bg-gray-800 rounded-lg h-72 animate-pulse"
      />
    </div>

    <div
      v-else-if="paginatedBreeds.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      <div
        v-for="breed in paginatedBreeds"
        :key="breed.name"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <NuxtLink :to="`/breeds/${breed.name}`" class="block h-full">
          <div class="aspect-w-16 aspect-h-9">
            <img
              :src="breed.image"
              :alt="breed.name"
              class="w-full h-48 object-cover"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <h3 class="text-xl font-semibold capitalize dark:text-white">
              {{ breed.name }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="!isLoading" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        No breeds found matching "{{ searchQuery }}"
      </p>
    </div>
    <UPagination
      v-if="filteredBreeds.length > itemsPerPage"
      v-model="currentPage"
      :total="filteredBreeds.length"
      :per-page="itemsPerPage"
      class="flex justify-center"
    />
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 6;

const { breeds, isLoading, error, fetchBreeds } = useBreeds();

onMounted(async () => {
  await fetchBreeds();
});
const filteredBreeds = computed(() => {
  return breeds.value.filter((breed) =>
    breed.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const paginatedBreeds = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBreeds.value.slice(start, end);
});

watch(searchQuery, () => {
  currentPage.value = 1;
});
</script>
