<template>
  <div v-if="isLoading" class="container mx-auto px-4 py-8">
    <div class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-gray-200 rounded-lg aspect-video"
        ></div>
      </div>
    </div>
  </div>
  <div v-else-if="error" class="container mx-auto px-4 py-12 text-center">
    <h1 class="text-4xl font-bold mb-4">Breed Not Found</h1>
    <p class="text-gray-600 mb-8">{{ error }}</p>
    <NuxtLink
      to="/breeds"
      class="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
    >
      View All Breeds
    </NuxtLink>
  </div>
  <div v-else class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold capitalize mb-2">{{ breed }}</h1>
      <p class="text-gray-600">Explore beautiful photos of {{ breed }} dogs</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(image, index) in breedImages"
        :key="index"
        class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      >
        <img
          :src="image"
          :alt="`${breed} ${index + 1}`"
          class="w-full aspect-video object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const breed = route.params.breed as string;
const breedImages = ref<string[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const { data: breedsList } = await useFetch<{ message: string[] }>(
      "https://dog.ceo/api/breeds/list"
    );

    if (!breedsList.value?.message.includes(breed)) {
      throw new Error("Breed not found");
    }

    const { data: images } = await useFetch<{ message: string[] }>(
      `https://dog.ceo/api/breed/${breed}/images/random/6`
    );

    if (images.value?.message) {
      breedImages.value = images.value.message;
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
    navigateTo("/404");
  } finally {
    isLoading.value = false;
  }
});
</script>
