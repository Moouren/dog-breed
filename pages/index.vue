<template>
  <div>
    <section class="container mx-auto px-4 py-12">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Discover Dog Breeds</h1>
        <p class="text-xl text-gray-600 mb-8">
          Explore different dog breeds and find your perfect companion
        </p>
        <NuxtLink
          to="/breeds"
          class="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
        >
          View All Breeds
        </NuxtLink>
      </div>
      <div class="mt-8">
        <img
          src="/hero-dog.jpg"
          alt="Happy Dog"
          class="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-8">Featured Breeds</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="breed in featuredBreeds"
          :key="breed"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <NuxtLink :to="`/breeds/${breed}`">
            <img
              :src="breedImages[breed]"
              :alt="breed"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold capitalize dark:text-white">
                {{ breed }}
              </h3>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="text-center mt-8">
        <NuxtLink
          to="/breeds"
          class="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Explore More Breeds
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const featuredBreeds = ref([]);
const breedImages = ref({});

const { data: breeds } = await useFetch("https://dog.ceo/api/breeds/list");
if (breeds.value?.message) {
  featuredBreeds.value = breeds.value.message.slice(0, 6);

  for (const breed of featuredBreeds.value) {
    const { data: image } = await useFetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    breedImages.value[breed] = image.value?.message;
  }
}
</script>
