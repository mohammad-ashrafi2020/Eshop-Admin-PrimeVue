<template>
  <div>


    <div class="flex gap-1 flex-wrap justify-center sm:flex-col-reverse">
      <Select class="sm:w-full" v-model="take" :options="[{
        label: '5',
        value: 5
      },
      {
        label: '10',
        value: 10
      },
      {
        label: '15',
        value: 15
      },
      {
        label: '25',
        value: 25
      },

      {
        label: '35',
        value: 35
      }]" optionLabel="label" placeholder="تعداد نمایش" />
      <div class="flex flex-wrap justify-center">
        <div v-if="filterResult.currentPage > 1">
          <Button @click="goFirstPage" rounded text icon="pi pi-angle-double-right"></Button>
          <Button @click="prev" rounded text icon="pi pi-angle-right"></Button>
        </div>
        <Button @click="currentPageModel = item" v-for="item in generatePages()" :label="item.toString()"
          :severity="item == filterResult.currentPage ? 'green' : 'secondary'" :text="item != filterResult.currentPage"
          aria-label="Star" />
        <div v-if="filterResult.currentPage < filterResult.pageCount">
          <Button @click="goLastPage" text severity="contrast" rounded icon="pi pi-angle-double-left"></Button>
          <Button @click="next" text severity="contrast" rounded icon="pi pi-angle-left"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FilterResult } from '~/models/Filterresult';

const currentPageModel = defineModel({
  type: Number,
  required: true
});
const emits = defineEmits(['changeTake']);
const { filterResult } = defineProps<{
  filterResult: FilterResult<any>
}>()
const take = ref({
  label: filterResult.take.toString(),
  value: filterResult.take
});
const generatePages = () => {
  var pages = [];
  for (var i = filterResult.startPage; i <= filterResult.endPage; i++) {
    pages.push(i);
  }
  return pages;
}
watch(take, (val) => {
  emits('changeTake', val.value)
});

const next = () => {
  currentPageModel.value += 1;
}
const prev = () => {
  currentPageModel.value -= 1;

}
const goFirstPage = () => {
  currentPageModel.value = 1;
}
const goLastPage = () => {
  currentPageModel.value = filterResult.pageCount;

}
</script>

<style></style>