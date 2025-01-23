<template>
  <aside :class="{ 'open': modelValue == true }" class="bg-white transition-all border-l border-gray-200">
    <div>
      <NuxtLink to="/" class="link">
        <i class="pi pi-book"></i>
        داشبورد
      </NuxtLink>
      <NuxtLink to="/banners" class="link">
        <i class="pi pi-images"></i>
        مدیریت بنر ها
      </NuxtLink>
      <NuxtLink to="/categories" class="link">
        <i class="pi pi-book"></i>
        مدیریت دسته بندی ها
      </NuxtLink>
      <NuxtLink to="/users" class="link">
        <i class="pi pi-users"></i>
        مدیریت کاربران
      </NuxtLink>
      <NuxtLink to="/orders" class="link">
        <i class="pi pi-shopping-bag"></i>
        مدیریت سفارشات
      </NuxtLink>
      <NuxtLink to="/comments" class="link">
        <i class="pi pi-comments"></i>
        مدیریت نظرات
      </NuxtLink>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean
}>();
</script>

<style scoped>
@media screen and (max-width:768px) {
  aside {
    position: absolute;
    top: 0;
    right: -100%;
    height: 100svh;
    z-index: 101;
  }

  aside.open {
    right: 0;
  }
}

.link {
  @apply px-4 py-5;
  display: flex;
  width: 100%;
  gap: .5rem;
  align-items: center;
  transition: all ease .2s;
}

.link:hover {
  @apply bg-surface-200;
}

.link i {
  font-size: 20px;
}

.link.router-link-exact-active {
  @apply bg-primary-100;
}
</style>