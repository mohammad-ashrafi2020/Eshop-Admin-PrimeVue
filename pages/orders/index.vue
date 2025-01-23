<template>
  <div>
    <div class="card">
      <DataTable :loading="loading" dir="rtl" :value="orderFilterResult?.data" 
      >
        <Column field="id" header="#"></Column>
        <Column field="userFullName" header="نام و نام خانوادگی"></Column>
        <Column field="shire" header="استان - شهر">
          <template #body="slotProps">
            <p>{{ slotProps.data.shire }}-{{ slotProps.data.city }}</p>
          </template>
        </Column>
        <Column field="totalItemCount" header="تعداد محصولات"></Column>
        <Column field="shippingType" header="روش ارسال"></Column>
        <Column field="totalPrice" header="قیمت">
          <template #body="slotProps">
            <p>{{ Number(slotProps.data.totalPrice).toLocaleString() }} تومان</p>
          </template>
        </Column>
        <Column field="userRecommendedStatus" header="وضعیت">
          <template #body="slotProps">
            <p :class="[
              { 'text-red-600': slotProps.data.status == 2 },
              { 'text-green-600': slotProps.data.status == 1 },
              { 'text-yellow-600': slotProps.data.status == 0 }
            ]">{{ GetOrderStatusName(slotProps.data.status) }}</p>
          </template>
        </Column>
        <Column field="id" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button size="small" severity="info" label="نمایش"></Button>
              <Button size="small" severity="danger">حذف</Button>
            </div>
          </template>
        </Column>
        <template #footer>
          <div class="flex w-full justify-center items-center">
            <BasePagination v-model="filterParams.pageId" v-if="orderFilterResult" :filterResult="orderFilterResult"
              @changeTake="changeTake" />
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FilterResult } from '~/models/Filterresult';
import type { OrderFilterParams, OrderListData } from '~/models/orders/orderListData';
import { getOrders } from '~/services/order.service';
import { GetOrderStatusName } from "~/utils/EnumConvertor"

const orderFilterResult: Ref<FilterResult<OrderListData> | null> = ref(null);
const loading = ref(false);
const filterParams = reactive<OrderFilterParams>({
  pageId: 1,
  take: 10,
  status: undefined,
  userId: undefined,
  endDate: undefined,
  startDate: undefined
})
onMounted(async () => {
  getData();
});


definePageMeta({
  title: "مدیریت سفارشات",
});
const getData = async () => {
  loading.value = true;
  var result = await getOrders(filterParams);
  orderFilterResult.value = result.data;
  loading.value = false;
}
watch(filterParams, () => {
  getData();
})
const changeTake = (newTake: number) => {
  filterParams.pageId = 1;
  filterParams.take = newTake;
}
</script>

<style></style>