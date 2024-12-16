<template>
  <header class="border-b bg-white dark:bg-gray-800 text-black dark:text-white">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold"> 🐕 Dog Gallery </NuxtLink>

        <div class="flex items-center gap-4">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="hover:text-primary-500"
          >
            {{ item.title }}
          </NuxtLink>

          <UButton
            icon="i-heroicons-sun-20-solid"
            color="gray"
            variant="ghost"
            @click="toggleColorMode"
          />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const menuItems = [
  { title: "Home", path: "/" },
  { title: "Breeds", path: "/breeds" },
  { title: "About", path: "/about" },
];

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
