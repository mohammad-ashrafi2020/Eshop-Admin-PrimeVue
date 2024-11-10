<template>
  <div>
    <DashboardTopBar />

  </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '~/stores/account.store';
import { CustomFetch } from '~/utils/CustomFetch';


onMounted(async () => {
  var result = await CustomFetch<any[]>("/Order");
});

</script>

<style></style>