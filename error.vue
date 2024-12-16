<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <div class="text-center px-4">
      <div class="mb-8">
        <UIcon
          name="i-heroicons-exclamation-circle"
          class="w-24 h-24 text-red-500 mx-auto"
        />
      </div>
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 class="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-8">
        {{ error?.message || "This page is not exists" }}
      </h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8">
        you can go to the main page or retry page
      </p>
      <div class="space-x-4 rtl:space-x-reverse">
        <UButton color="gray" @click="handleError"> Retry</UButton>
        <UButton color="primary" to="/"> go back to home</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => {
  clearError();
};
</script>
