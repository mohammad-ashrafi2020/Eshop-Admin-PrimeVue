<template>
  <div class="card-body">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex gap-3">
        <BaseInputText v-model="data.link" class="w-1/2" label="آدرس اینترنتی" type="url" name="url" />
        <Select class="w-1/2" v-model="selectedPosition" :options="positions" optionLabel="name"
          placeholder="انتخاب مکان بنر" />
      </div>
      <div class="card flex flex-col items-center gap-6 mt-8">
        <FileUpload choose-label="انتخاب عکس بنر" mode="basic" @select="onFileSelect" customUpload auto
          severity="secondary" class="p-button-outlined" />
        <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl max-w-[400px]"
          style="filter: grayscale(100%)" />
      </div>
      <div class="flex w-full justify-end">
        <Button :loading="loading" type="submit">ثبت بنر</Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup'
import { BannerPosition } from '~/models/banners/Banner';
import type { CreateBannerCommand } from '~/models/banners/CreateBannerCommand';
import { CreateBanner } from '~/services/banner.service';
import { SuccessOperation } from '~/utils/DefaultMessages';
import { GetBannerPositonName } from '~/utils/EnumConvertor';
const loading = ref(false);

const selectedPosition = ref()
const positions = ref([
  { name: GetBannerPositonName(BannerPosition.بالای_اسلایدر), value: BannerPosition.بالای_اسلایدر },
  { name: GetBannerPositonName(BannerPosition.زیر_اسلایدر), value: BannerPosition.زیر_اسلایدر },
  { name: GetBannerPositonName(BannerPosition.سمت_راست_شگفت_انگیز), value: BannerPosition.سمت_راست_شگفت_انگیز },
  { name: GetBannerPositonName(BannerPosition.سمت_چپ_اسلایدر), value: BannerPosition.سمت_چپ_اسلایدر },
  { name: GetBannerPositonName(BannerPosition.وسط_صفحه), value: BannerPosition.وسط_صفحه },
]);
const src = ref('');
const onFileSelect = (event: any) => {
  const file = event.files[0];
  data.imageFile = file;
  const reader = new FileReader();

  reader.onload = async (e) => {
    //@ts-ignore
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}
const data = reactive<CreateBannerCommand>({
  link: "",
  imageFile: null,
  position: BannerPosition.بالای_اسلایدر
});
const toast = useToast();
const router = useRouter();
const schema = Yup.object().shape({
  url: Yup.string().required().url().label("آدرس اینترنتی"),
  // position: Yup.string().required()
});

const submited = async () => {
  if (!data.imageFile) {
    toast.add({
      summary: "عکس را انتخاب کنید"
    });
    return;
  }
  loading.value = true;
  var result = await CreateBanner(data);
  if (result.isSuccess) {
    toast.add({
      summary: SuccessOperation
    });
    router.push('/banners')
  }
  loading.value = false;
}
definePageMeta({
  title: "افزودن بنر"
});
</script>

<style></style>