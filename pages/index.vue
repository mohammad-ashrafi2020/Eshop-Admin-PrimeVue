<template>
  <div>
    <DashboardTopBar />

  </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '~/stores/account.store';
import { CustomFetch } from '~/utils/CustomFetch';


onMounted(async () => {
  var result = await CustomFetch<any[]>("/Banner");
  console.log(result.data[0])
})
</script>

<style></style>