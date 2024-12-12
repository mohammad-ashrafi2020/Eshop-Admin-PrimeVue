<template>
  <div>
    <div class="card">
      <Button as="router-link" to="/categories/add" class="mb-2">افزودن دسته بندی</Button>
      <DataTable :loading="loading" :value="data" dir="rtl" tableStyle="min-width: 50rem">
        <Column field="imageName" header="عکس">
          <template #body="slotProps">
            <img :src="GetCategoryImageUrl(slotProps.data.imageName)" :alt="slotProps.data.title"
              class="w-[200px] rounded" />
          </template>
        </Column>
        <Column field="title" header="عنوان" />
        <Column field="slug" header="slug" />
        <Column field="childs" header="زیر گروه ها">
          <template #body="slotProps">
            <ul>
              <div class="flex items-center gap-2 mb-2" v-for="item in slotProps.data.childs" :key="item.id">
               <div class="w-[5px] h-[5px] bg-black rounded-full"></div>
                <p>{{ item.title }}</p>
                <Button size="small" severity="info" as="router-link" label="ویرایش"
                  :to="`/banners/edit-${slotProps.data.id}`" />
                <Button size="small" @click=openDeleteDialog(slotProps.data.id) severity="danger">حذف</Button>
              </div>
            </ul>
          </template>
        </Column>
        <Column field="id" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button severity="info" as="router-link" label="ویرایش" :to="`/banners/edit-${slotProps.data.id}`" />
              <Button @click=openDeleteDialog(slotProps.data.id) severity="danger">حذف</Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePrimeFunctions } from '~/composables/usePrimeFunctions';
import type { Category } from '~/models/categories/Category';
import { DeleteBanner, GetBanners } from '~/services/banner.service';
import { GetCategories } from '~/services/category.service';
import { GetBannerPositonName } from '~/utils/EnumConvertor';
import { GetBannerImageUrl, GetCategoryImageUrl } from '~/utils/ImagePath';
const data: Ref<Category[]> = ref([])
const loading = ref(true);
const primeFunctions = usePrimeFunctions();

const selectedItem = ref(0);

const deleteFunction = async () => {
  var res = await DeleteBanner(selectedItem.value);
  if (res.isSuccess) {
    data.value = data.value.filter(f => f.id != selectedItem.value);
    selectedItem.value = 0;
    primeFunctions.successToast();
  }
}
const openDeleteDialog = (id: number) => {
  selectedItem.value = id;
  primeFunctions.deleteDialog(undefined, undefined, deleteFunction)
}
onMounted(async () => {
  await getData();
});
const getData = async () => {
  loading.value = true;
  var res = await GetCategories();
  loading.value = false;
  data.value = res.data ?? [];
}
definePageMeta({
  title: "مدیریت دسته بندی ها"
})
</script>

<style></style>