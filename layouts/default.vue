<template>
  <div>
    <TheHeader @changeSidebarStatus="(isOpen) => isOpenSideBar = isOpen" />
    <main class="flex min-h-[91svh]">
      <TheSideBar v-model="isOpenSideBar" class="w-[20%] md:w-[35%] sm:!w-[70%]" />
      <div class="w-[80%] p-2 md:w-[65%] sm:!w-full">
        <Breadcrumb class="mb-2" :home="home" :model="items">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'text-color']" />
                <span class="text-primary font-semibold">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
              <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
            </a>
          </template>
          <template #separator>
            <i v-if="items.length > 0" class="pi pi-chevron-left"></i>
          </template>
        </Breadcrumb>
        <slot />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
const isOpenSideBar = ref(false);
const route = useRoute();
const home = {
  label: 'داشبورد',
  route: '/'
};
const items: Ref<any[]> = ref([]);
watch(() => route.path, () => {
  items.value = [];
  if (route.meta.bread) {
    items.value = route.meta.bread as [];
  } else if (route.meta.title) {
    items.value = [
      {
        label: route.meta.title
      }
    ];
  }
})
onMounted(() => {
  if (route.meta.bread) {
    items.value = route.meta.bread as [];
  } else if (route.meta.title) {
    items.value = [
      {
        label: route.meta.title
      }
    ];
  }
})
</script>

<style scoped>
.test {
  display: flex;
  gap: 2;
}
</style>