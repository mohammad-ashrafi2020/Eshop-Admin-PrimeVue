<template>
  <div class="card-body">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex sm:flex-wrap gap-3 mb-3">
        <BaseInputText v-model="data.title" class="w-1/2 sm:w-full" label="عنوان محصول" name="title" />
        <BaseInputText v-model="data.slug" class="w-1/2 sm:w-full" label="slug" name="slug" />
      </div>
      <div class="flex sm:flex-wrap gap-3 mb-3">
        <BaseSelectBox :options="getMainCategory" v-model="data.categoryId" class="w-1/2 sm:w-full"
          label="دسته بندی اصلی" name="categoryId" />
        <BaseSelectBox :options="getSubCategories" v-model="data.subCategoryId" class="w-1/2 sm:w-full" label="دسته دوم"
          name="subCategoryId" />
      </div>
      <BaseTextArea v-model="data.description" class="w-full " label="توضیحات محصول" name="description" />
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
import type { Category } from '~/models/categories/Category';
import type { CreateCategoryCommand } from '~/models/categories/CreateCategoryCommand';
import type { CreateProductCommand } from '~/models/products/CreateProductCommand';
import { AddChildCategory, CreateCategory, GetCategories } from '~/services/category.service';
const loading = ref(false);

const data = reactive<CreateProductCommand>({
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
  categoryId: "0",
  subCategoryId: "0",
  secondarySubCategoryId: undefined,
  description: "",
  specifications: ""
});
const toast = useToast();
const router = useRouter();
const route = useRoute();
const categories: Ref<Category[]> = ref([]);
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

  // 

  loading.value = false;
}
definePageMeta({
  title: "افزودن محصول",
  bread: [
    {
      label: 'مدیریت محصولات',
      route: '/products'
    },
    {
      label: "افزودن محصول جدید",
    },
  ]
});
const getMainCategory = computed(() => {
  console.log(categories.value);
  if (categories.value.length == 0) {
    return [];
  }
  return [...categories.value].map(f => {
    return {
      name: f.title,
      value: f.id.toString()
    }
  })
});
const getSubCategories = computed(() => {
  var childs = [...categories.value].find(f => f.id == Number(data.categoryId))?.childs;
  if (!childs) {
    return [];
  }
  return childs.map(f => {
    return {
      name: f.title,
      value: f.id.toString()
    }
  })
});

onMounted(async () => {
  await getCategories();
})
const getCategories = async () => {
  loading.value = true;
  var res = await GetCategories();
  loading.value = false;
  console.log(res.data);
  categories.value = res.data ?? [];
}
</script>

<style></style>