<template>
  <div>
    <FloatLabel variant="on">
      <InputText
        class="w-full"
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        v-bind="$attrs"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
  </div>
</template>

<script lang="ts" setup>
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const id = useId();
const {
  name,
  label = null,
  placeholder = "",
  type = "text",
} = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  type?: "password" | "text" | "url";
}>();
</script>

<style></style>
