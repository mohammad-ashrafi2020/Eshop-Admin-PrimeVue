<template>
  <header class="py-4 px-5 bg-white border-b border-gray-200 flex justify-between">
    <p class="text-xl">پنل مدیریت</p>
    <div class="flex gap-2">
      <Button v-if="isDarkMode" @click="isDarkMode = !isDarkMode" severity="secondary" icon="pi pi-sun"
        aria-label="sun" />
      <Button v-else @click="isDarkMode = !isDarkMode" severity="secondary" icon="pi pi-moon" aria-label="moon" />
      <Button severity="secondary" icon="pi pi-home" aria-label="home" />
    </div>
  </header>
</template>

<script lang="ts" setup>
const isDarkMode = ref(false);
</script>

<style></style>