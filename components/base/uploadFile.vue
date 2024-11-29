<template>
  <div class="card flex flex-col items-center gap-6 mt-8">
    <div class="flex gap-2">
      <FileUpload :choose-label="Chooselabel" mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
        class="p-button-outlined" :accept="accept" />
      <Button @click="remove" v-if="model" severity="danger" label="حدف فایل" />
    </div>
    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl max-w-[400px]" style="filter: grayscale(100%)" />
  </div>
</template>

<script lang="ts" setup>
const src = ref('');
const model = defineModel({
  type: Blob || null
});
const { Chooselabel = "انتخاب عکس", accept = "image/*" } = defineProps<{
  Chooselabel?: string,
  accept?: string,
}>();
const onFileSelect = (event: any) => {
  const file = event.files[0];
  model.value = file;
  const reader = new FileReader();
  reader.onload = async (e) => {
    //@ts-ignore
    src.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
const remove = () => {
  //@ts-ignore
  model.value = null;
  src.value = "";
}
</script>

<style></style>