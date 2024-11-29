<template>
  <div>
    <div v-if="utilStore.globalLoading"
      class="bg-black/60 fixed top-0 z-[10001] left-0 w-full h-full flex items-center justify-center">
      <p class="text-lg text-white font-bold ">Loading ..................</p>
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import 'primeicons/primeicons.css';
import { useUtilStore } from './stores/util.store';
const utilStore = useUtilStore();
</script>