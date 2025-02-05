<template>
  <div v-if="data?.data">
    <h3 class="mt-5 mb-2 font-bold text-lg">اطلاعات سفارش</h3>
    <div class="card-body">
      <div class="flex justify-between gap-2 flex-wrap">
        <p>نام و نام خانوادگی : <b>{{ data.data.userFullName }}</b></p>
        <p>وضعیت سفارش: <b :class="[
          { 'text-red-600': data.data.status == 2 },
          { 'text-green-600': data.data.status == 1 },
          { 'text-yellow-600': data.data.status == 0 }
        ]">{{ GetOrderStatusName(data.data.status) }}</b></p>
      </div>
      <div class="flex justify-between gap-2 flex-wrap mt-2">
        <p>مبلغ سفارش : <b>{{ data.data.totalPrice.toLocaleString() }} تومان</b></p>
        <p v-if="data.data.discount">مبلغ تخفیف : <b>{{ data.data.discount.discountAmount.toLocaleString() }} تومان - {{
          data.data.discount.discountTitle }}</b></p>
        <p> هزینه پست : <b>{{ (data.data.shippingMethod?.shippingCost ?? 0).toLocaleString() }} تومان</b></p>
        <p> نوع ارسال : <b>{{ data.data.shippingMethod?.shippingType }}</b></p>
      </div>
      <div class="flex justify-between gap-2 flex-wrap mt-2">
        <p>تاریخ ثبت سفارش : <label>{{ toPersianDate(new Date(data.data.creationDate), true, true) }} </label></p>
        <p> تاریخ بروزرسانی : <label>{{ toPersianDate(new Date(data.data.lastUpdate), true, true) }}</label></p>
      </div>
    </div>
    <h3 class="mt-5 mb-2 font-bold text-lg">اطلاعات آدرس</h3>
    <div class="card-body " v-if="data.data.address">
      <div class="flex justify-between gap-2 flex-wrap">
        <p>تحویل گیرنده : <b>{{ data.data.address.name }} {{ data.data.address.family }} - {{
          data.data.address.phoneNumber }} - {{ data.data.address.nationalCode }}</b></p>
        <p>استان و شهر <b>{{ data.data.address.shire }} {{ data.data.address.city }}</b></p>
      </div>
      <div class="flex justify-between gap-2 flex-wrap">
        <p> آدرس پستی : <b>{{ data.data.address.postalAddress }}</b></p>
        <p>کد پستی : <b>{{ data.data.address.postalCode }}</b></p>
      </div>
    </div>
    <h3 class="mt-5 mb-2 font-bold text-lg">محصولات</h3>
    <div class=" " v-if="data.data.items">
      <div class="flex gap-2 items-center  bg-white justify-between rounded shadow mb-2 p-2"
        v-for="item in data.data.items" :key="item.id">
        <div class="flex gap-1 items-center">
          <img class="w-[50px] object-cover h-[50px] rounded-md" :src="GetProductImageUrl(item.productImageName)" />
          <p>{{ item.productTitle }}</p>
        </div>
        <div>
          <p>قیمت محصول : <b>{{ item.price.toLocaleString() }}</b> تومان</p>
          <p> تعداد محصول : <b>{{ item.count }}</b></p>
          <p> جمع مبلغ : <b>{{ item.totalPrice.toLocaleString() }}</b> تومان</p>
        </div>
      </div>
    </div>
    <Button :loading="loading" v-if="data!.data.status == OrderStatus.Finally" severity="warn"
      @click="sendOrderForUser">سفارش برای مشتری
      ارسال شد</Button>
  </div>
</template>

<script lang="ts" setup>
import { getOrderById, SendOrder } from '~/services/order.service';
import { GetOrderStatusName } from '~/utils/EnumConvertor';
import { toPersianDate } from "~/utils/dateUtil"
import { GetProductImageUrl } from "~/utils/ImagePath"
import { OrderStatus } from '~/models/orders/orderListData';
import { usePrimeFunctions } from '~/composables/usePrimeFunctions';
const route = useRoute();
const router = useRouter();
const orderId = route.query.id;
const functions = usePrimeFunctions();

const { data, status } = await useAsyncData("order-" + orderId, () => getOrderById(Number(orderId)))
if (!data.value || data.value.isSuccess == false || !data.value.data) {
  if (process.client) {
    router.push('/orders');
    functions.errorToast();
  } else {
    throw createError({
      statusCode: 404,
      message: "NotFound"
    })
  }
}
const loading = ref(false);

definePageMeta({
  title: "نمایش سفارش",
  bread: [
    {
      label: 'مدیریت سفارشات',
      route: '/orders'
    },
    {
      label: "نمایش سفارش",
    },
  ]
});
const sendOrderForUser = async () => {
  loading.value = true;
  var result = await SendOrder(Number(orderId));
  if (result.isSuccess) {
    data.value!.data.status = OrderStatus.Shipping;
    functions.successToast();
  }
  loading.value = false;
}
</script>

<style></style>