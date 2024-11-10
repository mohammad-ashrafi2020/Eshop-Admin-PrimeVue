<template>
  <div class="bg-surface-50 dark:bg-surface-950 w-full">
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border sm:w-full w-1/3 mx-auto">
      <div class="text-center mb-8">
        <svg class="mb-4 mx-auto fill-surface-600 dark:fill-surface-200 h-16" viewBox="0 0 30 32" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z" />
        </svg>
        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">خوش آمدید</div>
      </div>
      <h1>Is Login = {{ accountStore.getToken != undefined }}</h1>
      <form @submit.prevent="signIn">
        <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">شماره تلفن</label>
        <InputText v-model="phoneNumber" type="text" placeholder="شماره تلفن" class="w-full mb-4" />

        <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">کلمه عبور</label>
        <InputText v-model="password" type="password" placehoder="کلمه عبور را وارد کنید" class="w-full mb-4" />

        <div class="flex items-center justify-between mb-5">
          <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">کلمه عبور را فراموش کرده اید
            ؟</a>
        </div>

        <Button type="submit" label="ورود" icon="pi pi-user" class="w-full" />
      </form>
    </div>
  </div>
</template>
<script setup>
import { Login } from '~/services/auth.service';
import { useAccountStore } from '~/stores/account.store';

const accountStore = useAccountStore();
const router = useRouter();
const phoneNumber = ref('');
const password = ref('');
const toast = useToast();
const signIn = async () => {
  var result = await Login(phoneNumber.value, password.value);
  if (result.isSuccess) {
    if (result.data.isAdmin) {
      accountStore.setAuthToken(result.data);
      router.push('/');
    } else {
      toast.add({
        summary: 'خطا',
        detail: "شما ادمین نیستید.",
        severity: 'error'
      })
    }
  }
}
definePageMeta({
  layout: 'auth'
});

</script>
