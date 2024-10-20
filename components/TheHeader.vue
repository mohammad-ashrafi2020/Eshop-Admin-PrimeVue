<template>
  <header class="py-4 px-5 bg-white items-center border-b border-gray-200 flex justify-between">
    <div v-if="isOpenSideBar" @click="isOpenSideBar = false"
      class="bg-black/65 z-[100] fixed top-0 right-0 h-[100svh] w-full"></div>
    <div class="flex gap-2 items-center">
      <i @click="isOpenSideBar = true" class="pi pi-align-right text-xl !hidden sm:!block"></i>
      <p class="text-xl">پنل مدیریت</p>
    </div>
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
const isOpenSideBar = ref(false);
const emit = defineEmits(['changeSidebarStatus']);

watch(isOpenSideBar, (newVal) => {
  emit('changeSidebarStatus', newVal)
})
</script>

<style></style>