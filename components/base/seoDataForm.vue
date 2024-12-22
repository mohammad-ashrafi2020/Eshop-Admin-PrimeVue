<template>
  <div class="flex flex-wrap  justify-between">
    <div class="w-1/2 p-2 sm:w-full">
      <BaseInputText name="metaTitle" v-model="model.metaTitle" label="metaTitle" />

    </div>
    <div class="w-1/2 p-2 sm:w-full">
      <BaseInputText name="metaDescription" v-model="model.metaDescription" label="metaDescription" />
    </div>
    <div class="w-1/2 p-2 sm:w-full">
      <BaseInputText name="metaKeyWords" v-model="model.metaKeyWords" label="metaKeyWords" />
    </div>
    <div class="w-1/2 p-2 sm:w-full">
      <BaseInputText type="url" name="canonical" v-model="model.canonical" label="canonical" />
    </div>
    <div class="p-2 w-full">
      <BaseSelectBox v-model="model.indexPage" class="w-full" name="indexPage" label="index Page?" :options="[{
        name: 'بله', value: 'true'
      },
      {
        name: 'خیر', value: 'false'
      },]"></BaseSelectBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SeoData } from '~/models/SeoData';

const model = defineModel<SeoData>({ required: true })
</script>

<style></style>