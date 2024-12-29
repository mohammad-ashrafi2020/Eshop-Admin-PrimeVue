<template>
  <div class="card-body">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex sm:flex-wrap gap-3">
        <BaseInputText v-model="data.title" class="w-1/2 sm:w-full" label="عنوان دسته بندی" name="title" />
        <BaseInputText v-model="data.slug" class="w-1/2 sm:w-full" label="slug" name="slug" />
      </div>
      <hr class="my-5" />
      <BaseSeoDataForm v-model="data.seoData" />
      <BaseUploadFile v-model="data.imageFile" />
      <div class="flex w-full justify-end">
        <Button :loading="loading" type="submit">ثبت اطلاعات</Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup'
import { usePrimeFunctions } from '~/composables/usePrimeFunctions';
import type { EditCategoryCommand } from '~/models/categories/CreateCategoryCommand';
import { EditCategory, GetCategoryById } from '~/services/category.service';
const loading = ref(true);

const data = reactive<EditCategoryCommand>({
  slug: "",
  title: "",
  imageFile: null,
  seoData: {
    canonical: "",
    indexPage: 'true',
    metaDescription: "",
    metaKeyWords: "",
    metaTitle: ""
  },
  id: 0
});
const toast = useToast();
const router = useRouter();
const route = useRoute();
const id = route.query.id ?? undefined;
const functions = usePrimeFunctions();
const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان"),
  slug: Yup.string().required().label("slug")
});

onMounted(async () => {
  loading.value = true;
  const category = await GetCategoryById(Number(id));
  if (category.isSuccess) {
    data.seoData = category.data.seoData;
    data.slug = category.data.slug;
    data.title = category.data.title;
  } else {
    toast.add({
      summary: "دسته بندی مورد نظر یافت نشد",
      severity: 'error',
      life: 10000
    });
    router.push('/categories');
  }
  loading.value = false;
})
const submited = async () => {
  loading.value = true;
  data.id = Number(id)
  var childResult = await EditCategory(data);
  if (childResult.isSuccess) {
    functions.successToast();
    router.push('/categories')
  }
  loading.value = false;
}
definePageMeta({
  title: "ویرایش دسته بندی",
  bread: [
    {
      label: 'مدیریت دسته بندی ها',
      route: '/categories'
    },
    {
      label: "ویرایش دسته بندی",
    },
  ]
});
</script>

<style></style>