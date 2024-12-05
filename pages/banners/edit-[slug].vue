<template>
  <div class="card-body" :class="{ 'card-loading': status == 'pending' }">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex gap-3">
        <BaseInputText v-model="data.link" class="w-1/2" label="آدرس اینترنتی" type="url" name="url" />
        <BaseSelectBox v-model="data.position" label="مکان قرارگیری" class="w-1/2" name="position"
          :options="positions" />
      </div>
      <BaseUploadFile :default-src="GetBannerImageUrl(banner!.data.imageName)" v-model="data.imageFile" />
      <div class="flex w-full justify-end">
        <Button :loading="loading" type="submit">ویراش بنر</Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup'
import { usePrimeFunctions } from '~/composables/usePrimeFunctions';
import { BannerPosition } from '~/models/banners/Banner';
import type {  EditBannerCommand } from '~/models/banners/CreateBannerCommand';
import {  EditBanner, GetBannerById } from '~/services/banner.service';
import { GetBannerPositonName } from '~/utils/EnumConvertor';
import { GetBannerImageUrl } from '~/utils/ImagePath';

const loading = ref(false);
const toast = useToast();
const route = useRoute();
const router = useRouter();
const functions = usePrimeFunctions();
const positions = ref([
  { name: GetBannerPositonName(BannerPosition.بالای_اسلایدر), value: BannerPosition.بالای_اسلایدر.toString() },
  { name: GetBannerPositonName(BannerPosition.زیر_اسلایدر), value: BannerPosition.زیر_اسلایدر.toString() },
  { name: GetBannerPositonName(BannerPosition.سمت_راست_شگفت_انگیز), value: BannerPosition.سمت_راست_شگفت_انگیز.toString() },
  { name: GetBannerPositonName(BannerPosition.سمت_چپ_اسلایدر), value: BannerPosition.سمت_چپ_اسلایدر.toString() },
  { name: GetBannerPositonName(BannerPosition.وسط_صفحه), value: BannerPosition.وسط_صفحه.toString() },
]);
const { data: banner, status } = await useAsyncData("banner-" + route.params.slug, () => GetBannerById((Number(route.params.slug))));
const data = reactive<EditBannerCommand>({
  link: banner.value!.data.link,
  imageFile: null,
  position: banner.value!.data.position,
  id: Number(route.params.slug)
});

const schema = Yup.object().shape({
  url: Yup.string().required().url().label("آدرس اینترنتی"),
  position: Yup.string().required().label("مکان قرارگیری")
});

const submited = async () => {
  loading.value = true;
  var result = await EditBanner(data);
  if (result.isSuccess) {
    functions.successToast();
    router.push('/banners')
  }
  loading.value = false;
}
definePageMeta({
  title: "ویرایش بنر",
  bread: [
    {
      label: 'مدیریت بنر ها',
      route: '/banners'
    },
    {
      label: 'ویرایش بنر',
    },
  ]
});
</script>

<style></style>