<template>
  <div class="card-body">
    <Skeleton v-if="initLoading" />
    <Form v-else :validation-schema="schema" @submit="submited">
      <div class="flex sm:flex-wrap gap-3 mb-3">
        <BaseInputText
          v-model="data.title"
          class="w-1/2 sm:w-full"
          label="عنوان محصول"
          name="title"
        />
        <BaseInputText
          v-model="data.slug"
          class="w-1/2 sm:w-full"
          label="slug"
          name="slug"
        />
      </div>
      <div class="flex sm:flex-wrap gap-3 mb-3">
        <BaseSelectBox
          :options="getMainCategory"
          v-model="data.categoryId"
          class="w-1/2 sm:w-full"
          label="دسته بندی اصلی"
          name="categoryId"
        />
        <BaseSelectBox
          :options="getSubCategories"
          v-model="data.subCategoryId"
          class="w-1/2 sm:w-full"
          label="دسته دوم"
          name="subCategoryId"
        />
      </div>
      <BaseTextArea
        v-model="data.description"
        class="w-full"
        label="توضیحات محصول"
        name="description"
      />
      <hr class="my-5" />
      <ProductsSpecifications
        :init-data="specifications"
        @row-count="(newVal) => (rowCount = newVal)"
      />
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
import { Form } from "vee-validate";
import * as Yup from "yup";
import { usePrimeFunctions } from "~/composables/usePrimeFunctions";
import type { Category } from "~/models/categories/Category";
import type { CreateCategoryCommand } from "~/models/categories/CreateCategoryCommand";
import type { CreateProductCommand } from "~/models/products/CreateProductCommand";
import type { EditProductCommand } from "~/models/products/EditProductCommand";
import type { ProductSpecification } from "~/models/products/Product";
import {
  AddChildCategory,
  CreateCategory,
  GetCategories,
} from "~/services/category.service";
import {
  CreateProduct,
  EditProduct,
  GetProductById,
} from "~/services/product.service";
const loading = ref(false);
const initLoading = ref(false);
const rowCount = ref(1);
const route = useRoute();
const router = useRouter();

const data = reactive<EditProductCommand>({
  slug: "",
  title: "",
  imageFile: null,
  seoData: {
    canonical: "",
    indexPage: "true",
    metaDescription: "",
    metaKeyWords: "",
    metaTitle: "",
  },
  categoryId: "0",
  subCategoryId: "0",
  description: "",
  specifications: "",
  productId: +route.params.id.toString(),
});
const specifications = ref<ProductSpecification[]>([]);
const categories: Ref<Category[]> = ref([]);
const functions = usePrimeFunctions();
const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان"),
  slug: Yup.string().required().label("slug"),
});

const submited = async () => {
  loading.value = true;
  data.specifications = getSpecificationValue();
  var result = await EditProduct(data);
  if (result.isSuccess) {
    functions.successToast("محصول با موفقیت ویرایش شد");
    router.push("/products");
  }
  //
  loading.value = false;
};
const getSpecificationValue = () => {
  let result = {};
  for (let i = 1; i <= rowCount.value; i++) {
    let titleInput = document.querySelector(`input[name=t-${i}]`);
    let valueInput = document.querySelector(`input[name=v-${i}]`);

    if (titleInput && valueInput) {
      if (!titleInput.value) {
        continue;
      }
      //@ts-ignore
      result[titleInput.value] = valueInput.value;
    }
  }
  return JSON.stringify(result);
};
definePageMeta({
  title: "افزودن محصول",
  bread: [
    {
      label: "مدیریت محصولات",
      route: "/products",
    },
    {
      label: "افزودن محصول جدید",
    },
  ],
});
const getMainCategory = computed(() => {
  console.log(categories.value);
  if (categories.value.length == 0) {
    return [];
  }
  return [...categories.value].map((f) => {
    return {
      name: f.title,
      value: f.id.toString(),
    };
  });
});
const getSubCategories = computed(() => {
  var childs = [...categories.value].find(
    (f) => f.id == Number(data.categoryId)
  )?.childs;
  if (!childs) {
    return [];
  }
  return childs.map((f) => {
    return {
      name: f.title,
      value: f.id.toString(),
    };
  });
});

onMounted(async () => {
  initLoading.value = true;
  var product = await GetProductById(+route.params.id);
  if (!product.data) {
    router.push("/products");
    functions.errorToast("محصول مورد نظر یافت نشد");
  } else {
    data.categoryId = product.data.category.id.toString();
    data.description = product.data.description;
    data.productId = product.data.id;
    data.seoData = product.data.seoData;
    data.slug = product.data.slug;
    data.title = product.data.title;
    data.subCategoryId = product.data.subCategory.id.toString();
    specifications.value = product.data.specifications;
  }
  await getCategories();
  initLoading.value = false;
});
const getCategories = async () => {
  loading.value = true;
  var res = await GetCategories();
  loading.value = false;
  console.log(res.data);
  categories.value = res.data ?? [];
};
</script>

<style></style>
