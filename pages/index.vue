<template>
  <div>
    <DashboardTopBar />
    <Form :validation-schema="schema" @submit="sub">
      <BaseInputText name="name" label="نام" v-model="name" />
      <Button type="submit">ثبت</Button>
    </Form>
    {{ name }}

  </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import { CustomFetch } from '~/utils/CustomFetch';
import * as Yup from 'yup'

const name = ref('');
const schema = Yup.object().shape({
  name: Yup.string().required().min(10)
});
const sub = () => {
  console.log(name.value)
}
onMounted(async () => {
  var result = await CustomFetch<any[]>("/Order");
});

</script>

<style></style>