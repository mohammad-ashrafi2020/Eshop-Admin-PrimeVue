<template>
  <div>
    <div class="card">
      <Button as="router-link" to="/products/add" class="mb-2">افزودن محصول جدید</Button>
      <DataTable :loading="loading" dir="rtl" :value="comments?.data" tableStyle="min-width: 50rem">
        <Column field="id" header="id"></Column>
        <Column field="imageName" header="عکس">
          <template #body="slotProps">
            <img class="w-[50px] h-[50px] rounded-md" :alt="slotProps.data.title" :src="GetProductImageUrl(slotProps.data.imageName)" />
          </template>
        </Column>
        <Column field="title" header="عنوان"></Column>
        <Column field="slug" header="اسلاگ"></Column>
        <Column field="id" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button @click="openDialog(slotProps.data)" size="small" severity="info" label="نمایش"></Button>
              <Button size="small" @click="openDeleteDialog(slotProps.data)" severity="danger">حذف</Button>
            </div>
          </template>
        </Column>
        <template #footer>
          <div class="flex w-full justify-center items-center">
            <BasePagination v-model="filterParams.pageId" v-if="comments" :filterResult="comments"
              @changeTake="changeTake" />
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePrimeFunctions } from '~/composables/usePrimeFunctions';
import { CommentStatus, type Comment, type CommentFilterParams } from '~/models/comments/Comment';
import type { FilterResult } from '~/models/Filterresult';
import type { ProductFilterItem, ProductFilterParams } from '~/models/products/ProductFilterItem';
import { deleteComment, getComments, changeCommentStatus } from '~/services/comment.service';
import { GetProductsByFilter } from '~/services/product.service';
import { GetUserRecommendedStatusName } from '~/utils/EnumConvertor';
import { GetProductImageUrl } from '~/utils/ImagePath';

const comments: Ref<FilterResult<ProductFilterItem> | null> = ref(null);
const selectedComment: Ref<ProductFilterItem | null> = ref(null);
const primeFunctions = usePrimeFunctions();
const loading = ref(false);
const isOpenDialog = ref(false);
const selectedStatus = ref(CommentStatus.Accepted.toString())

const filterParams = reactive<ProductFilterParams>({
  pageId: 1,
  take: 10,
  id: undefined,
  slug: undefined,
  title: undefined
})
onMounted(async () => {
  getData();
})

definePageMeta({
  title: "مدیریت محصولات",
});
const openDeleteDialog = (comment: ProductFilterItem) => {
  selectedComment.value = comment;
  primeFunctions.deleteDialog(undefined, undefined, DeleteComment);
}
const DeleteComment = async () => {
  if (selectedComment.value) {
    var res = await deleteComment(selectedComment.value.id);
    if (res.isSuccess) {
      getData();
    }
  }
}
const getData = async () => {
  loading.value = true;
  var result = await GetProductsByFilter(filterParams);
  if (result.isSuccess) {
    comments.value = result.data;
  }
  loading.value = false;
}
watch(filterParams, () => {
  getData();
})
const changeTake = (newTake: number) => {
  filterParams.pageId = 1;
  filterParams.take = newTake;
}
const openDialog = (comment: any) => {
  selectedComment.value = comment;
  selectedStatus.value = comment.status.toString();
  isOpenDialog.value = true;
}
const changeStatus = async () => {
  // if (selectedComment.value) {
  //   var selected = Number(selectedStatus.value);
  //   var res = await changeCommentStatus(selectedComment.value.id, selected);
  //   if (res.isSuccess) {
  //     selectedComment.value.status = selected
  //     primeFunctions.successToast();
  //     // isOpenDialog.value = false;
  //   }
  // }
}
</script>

<style></style>