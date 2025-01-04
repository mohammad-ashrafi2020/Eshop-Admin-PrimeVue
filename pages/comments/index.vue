<template>
  <div>
    <div class="card">
      <DataTable dir="rtl" :value="comments" tableStyle="min-width: 50rem">
        <Column field="userFullName" header="نام و نام خانوادگی"></Column>
        <Column field="productTitle" header="محصول"></Column>
        <Column field="rate" header="امتیاز"></Column>
        <Column field="userRecommendedStatus" header="وضعیت پیشنهاد">
          <template #body="slotProps">
            <p :class="[
              { 'text-red-600': slotProps.data.userRecommendedStatus == 1 },
              { 'text-green-600': slotProps.data.userRecommendedStatus == 0 },
              { 'text-yellow-600': slotProps.data.userRecommendedStatus == 2 }
            ]">{{ GetUserRecommendedStatusName(slotProps.data.userRecommendedStatus) }}</p>
          </template>
        </Column>
        <Column field="id" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button size="small" severity="info" as="router-link" label="نمایش"></Button>
              <Button size="small" severity="danger">حذف</Button>
            </div>
          </template>
        </Column>
        <template #footer>
          <div class="flex w-full justify-center items-center">
            <BasePagination />
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CommentFilterParams, CommentStatus } from '~/models/comments/Comment';
import { getComments } from '~/services/comment.service';
import { GetUserRecommendedStatusName } from '~/utils/EnumConvertor';

const comments: Ref<Comment[]> = ref([]);
const loading = ref(false);
const filterParams = reactive<CommentFilterParams>({
  commentStatus: undefined,
  pageId: 1,
  take: 10,
  productId: undefined,
  userId: undefined
})
onMounted(async () => {
  loading.value = true;
  var result = await getComments(filterParams);
  if (result.isSuccess) {
    comments.value = result.data.data ?? [];
  }
})

definePageMeta({
  title: "مدیریت نظرات",
})
</script>

<style></style>