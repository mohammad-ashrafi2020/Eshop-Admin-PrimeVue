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
import type { CreateCategoryCommand } from '~/models/categories/CreateCategoryCommand';
import { AddChildCategory, CreateCategory } from '~/services/category.service';
const loading = ref(false);

const data = reactive<CreateCategoryCommand>({
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
  parentId: undefined
});
const toast = useToast();
const router = useRouter();
const route = useRoute();
const parentId = route.query.parentId ?? undefined;
const functions = usePrimeFunctions();
const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان"),
  slug: Yup.string().required().label("slug")
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

  if (parentId) {
    data.parentId = Number(parentId)
    var childResult = await AddChildCategory(data);
    if (childResult.isSuccess) {
      functions.successToast();
      router.push('/categories')
    }
  } else {
    var result = await CreateCategory(data);
    if (result.isSuccess) {
      functions.successToast();
      router.push('/categories')
    }
  }

  loading.value = false;
}
definePageMeta({
  title: "افزودن دسته بندی",
  bread: [
    {
      label: 'مدیریت دسته بندی ها',
      route: '/categories'
    },
    {
      label: "افزودن دسته بندی",
    },
  ]
});
onMounted(() => {
  route.meta.title = parentId ? "افزودن  زیر دسته بندی" : "افزودن دسته بندی"
  if (parentId) {
    route.meta.bread = [
      {
        label: 'مدیریت دسته بندی ها',
        route: '/categories'
      },
      {
        label: "افزودن  زیر دسته بندی",
      },
    ]
  }
})
</script>

<style></style>