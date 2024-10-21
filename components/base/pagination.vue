<template>
  <div>


    <div class="flex flex-wrap justify-center sm:flex-col-reverse">
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
        <div>
          <Button rounded text icon="pi pi-angle-double-right"></Button>
          <Button rounded text icon="pi pi-angle-right"></Button>
        </div>
        <Button v-for="item in [1, 2, 3, 4, 5]" :label="item.toString()" severity="secondary" text aria-label="Star" />
        <div>
          <Button text severity="contrast" rounded icon="pi pi-angle-double-left"></Button>
          <Button text severity="contrast" rounded icon="pi pi-angle-left"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const take = ref({
  label: '15',
  value: 15
});
</script>

<style></style>