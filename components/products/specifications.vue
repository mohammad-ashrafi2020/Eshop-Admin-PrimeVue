<template>
  <div>
    <h5>مشخصات محصول</h5>
    <table>
      <thead>
        <tr>
          <th>عنوان</th>
          <th>مقدار</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rowCount">
          <td>
            <BaseInputText :name="`t-${item}`" placeholder="عنوان" />
          </td>
          <td>
            <BaseInputText :name="`v-${item}`" placeholder="مقدار" />
          </td>
        </tr>
      </tbody>
    </table>
    <Button @click="add">افزودن رکورد جدید</Button>
  </div>
</template>

<script lang="ts" setup>
const rowCount = ref([1]);
const emit = defineEmits(['rowCount'])
const add = () => {
  var last = rowCount.value[rowCount.value.length - 1];
  rowCount.value.push(last + 1)
  emit('rowCount', last + 1)
}

</script>

<style></style>