<template>
  <div>
    <div class="card">
      <Button as="router-link" to="/banners/add" class="mb-2">افزودن بنر جدید</Button>
      <DataTable :loading="loading" :value="banners" dir="rtl" tableStyle="min-width: 50rem">
        <Column field="imageName" header="عکس">
          <template #body="slotProps">
            <img :src="GetBannerImageUrl(slotProps.data.imageName)" :alt="slotProps.data.image"
              class="w-[200px] rounded" />
          </template>
        </Column>
        <Column field="link" header="لینک">
          <template #body="slotProps">
            <NuxtLink class="text-blue-600" target="_blank" :to="slotProps.data.link" external>لینک بنر</NuxtLink>
          </template>
        </Column>
        <Column field="position" header="مکان قرارگیری در صفحه">
          <template #body="slotProps">
            <p>{{ GetBannerPositonName(slotProps.data.position) }}</p>
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
import type { Banner } from '~/models/banners/Banner';
import { DeleteBanner, GetBanners } from '~/services/banner.service';
import { GetBannerPositonName } from '~/utils/EnumConvertor';
import { GetBannerImageUrl } from '~/utils/ImagePath';
const banners: Ref<Banner[]> = ref([])
const loading = ref(true);
const primeFunctions = usePrimeFunctions();

const selectedItem = ref(0);

const deleteFunction = async () => {
  var res = await DeleteBanner(selectedItem.value);
  if (res.isSuccess) {
    banners.value = banners.value.filter(f => f.id != selectedItem.value);
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
  var res = await GetBanners();
  loading.value = false;
  banners.value = res.data ?? [];
}
definePageMeta({
  title: "مدیریت بنر ها"
})
</script>

<style></style>