<template>
  <div>
    <FloatLabel variant="on">
      <InputText @blur="(e) => handleBlur(e)" @change="(e) => handleChange(e)" :invalid="meta.valid == false" :id="id"
        v-model="model" :name="name" :placeholder="placeholder" />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <p v-if="meta.touched && errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { useField } from 'vee-validate';

const id = useId();
const model = defineModel({
  type: String,
  required: false
});
const { name, label = null, placeholder = "" } = defineProps<{
  name: string,
  label?: string,
  placeholder?: string
}>();
const { errorMessage, setValue, meta, handleChange, handleBlur } = useField(name, undefined, {
  initialValue: model[0]
});
watch(model, () => {
  setValue(model.value);
})
</script>

<style></style>