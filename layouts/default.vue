<template>
  <div>
    <header class="py-4 px-5 bg-surface-700"></header>
    <main>
      <div>
        <slot />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.test {
  display: flex;
  gap: 2;
}
</style>