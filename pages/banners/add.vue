<template>
  <div class="card-body">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex gap-3">
        <BaseInputText v-model="data.link" class="w-1/2" label="آدرس اینترنتی" type="url" name="url" />
        <BaseSelectBox v-model="data.position" label="مکان قرارگیری" class="w-1/2" name="position"
          :options="positions" />
      </div>
      <BaseUploadFile v-model="data.imageFile" />
      <div class="flex w-full justify-end">
        <Button :loading="loading" type="submit">ثبت بنر</Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup'
import { usePrimeFunctions } from '~/composables/usePrimeFunctions';
import { BannerPosition } from '~/models/banners/Banner';
import type { CreateBannerCommand } from '~/models/banners/CreateBannerCommand';
import { CreateBanner } from '~/services/banner.service';
import { SuccessOperation } from '~/utils/DefaultMessages';
import { GetBannerPositonName } from '~/utils/EnumConvertor';
const loading = ref(false);

const positions = ref([
  { name: GetBannerPositonName(BannerPosition.بالای_اسلایدر), value: BannerPosition.بالای_اسلایدر.toString() },
  { name: GetBannerPositonName(BannerPosition.زیر_اسلایدر), value: BannerPosition.زیر_اسلایدر.toString() },
  { name: GetBannerPositonName(BannerPosition.سمت_راست_شگفت_انگیز), value: BannerPosition.سمت_راست_شگفت_انگیز.toString() },
  { name: GetBannerPositonName(BannerPosition.سمت_چپ_اسلایدر), value: BannerPosition.سمت_چپ_اسلایدر.toString() },
  { name: GetBannerPositonName(BannerPosition.وسط_صفحه), value: BannerPosition.وسط_صفحه.toString() },
]);

const data = reactive<CreateBannerCommand>({
  link: "",
  imageFile: null,
  position: BannerPosition.بالای_اسلایدر
});
const toast = useToast();
const router = useRouter();
const functions = usePrimeFunctions();
const schema = Yup.object().shape({
  url: Yup.string().required().url().label("آدرس اینترنتی"),
  position: Yup.string().required().label("مکان قرارگیری")
});

const submited = async () => {
  if (!data.imageFile) {
    toast.add({
      summary: "عکس را انتخاب کنید",
      severity: 'error',
      life: 10000
    });
    return;
  }
  loading.value = true;
  var result = await CreateBanner(data);
  if (result.isSuccess) {
    functions.successToast();
    router.push('/banners')
  }
  loading.value = false;
}
definePageMeta({
  title: "افزودن بنر"
});
</script>

<style></style>