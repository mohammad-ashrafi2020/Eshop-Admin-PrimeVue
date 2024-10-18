<template>
  <div>
    <TheHeader />
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