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
      <tbody v-if="initData.length == 0">
        <tr v-for="item in rowCount" :key="item">
          <td>
            <BaseInputText :name="`t-${item}`" placeholder="عنوان" />
          </td>
          <td>
            <BaseInputText :name="`v-${item}`" placeholder="مقدار" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in initData" :key="item.key">
          <td>
            <BaseStaticInput
              :name="`t-${index + 1}`"
              placeholder="عنوان"
              :value="item.key"
            />
          </td>
          <td>
            <BaseStaticInput
              :name="`v-${index + 1}`"
              placeholder="مقدار"
              :value="item.value"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <Button @click="add">افزودن رکورد جدید</Button>
  </div>
</template>

<script lang="ts" setup>
import type { ProductSpecification } from "~/models/products/Product";

const rowCount = ref([1]);
const { initData = [] } = defineProps<{
  initData?: ProductSpecification[];
}>();
const emit = defineEmits(["rowCount"]);
const add = () => {
  var last = rowCount.value[rowCount.value.length - 1];
  rowCount.value.push(last + 1);
  emit("rowCount", last + 1);
};
onMounted(() => {
  if (initData.length > 0) {
    rowCount.value = [];
    var counter = 1;
    initData.forEach(() => {
      rowCount.value.push(counter);
      counter += 1;
    });
  }
  console.log(rowCount.value);
});
</script>

<style></style>
