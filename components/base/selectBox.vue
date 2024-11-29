<template>
  <div>
    <FloatLabel class="w-full" variant="on">
      <Select class="w-full" :inputId="id" v-model="selectedValue" :options="options" optionLabel="name"
        :placeholder="label == undefined ? placeholder : ''" :invalid="meta.valid == false" />
      <label :for="id" v-if="label">{{ label }}</label>
    </FloatLabel>
    <p v-if="meta.touched && errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import FloatLabel from 'primevue/floatlabel';
import { useField } from 'vee-validate';

const id = useId();
const model = defineModel({
  type: String,
  required: false
});
const selectedValue = ref();
const { name, label = null, placeholder = "انتخاب کنید", options } = defineProps<{
  name: string,
  label?: string,
  placeholder?: string,
  options: {
    name: string,
    value: string
  }[]
}>();
const { errorMessage, setValue, meta, handleChange, handleBlur } = useField(name, undefined, {
  initialValue: model[0]
});
watch(selectedValue, () => {
  setValue(selectedValue.value?.value ?? '');
  model.value = selectedValue.value?.value;
});
onMounted(() => {
  if (model.value) {
    selectedValue.value = options.find(f => f.value == model.value);
  }
})
</script>

<style></style>