<template>
  <div>
    <div class="card">
      <Button class="mb-2">افزودن کاربر جدید</Button>
      <DataTable dir="rtl" :value="customers" tableStyle="min-width: 50rem">
        <Column field="name" header="نام"></Column>
        <Column field="family" header="نام خانوادگی"></Column>
        <Column field="email" header="ایمیل"></Column>
        <Column field="phoneNumber" header="شماره تلفن"></Column>
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
definePageMeta({
  title: "مدیریت کاربران"
})
const customers = ref([
  {
    name: 'محمد',
    family: "اشرافی",
    email: "mohammad.ashrafi2020@outlook.com",
    phoneNumber: "09351171196"
  }
])
</script>

<style></style>