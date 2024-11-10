import { useAccountStore } from "~/stores/account.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();
  if (to.path.toLocaleLowerCase().startsWith("/auth") == false) {
    if (accountStore.isLogin == false) {
      return navigateTo("/auth");
    }
  } else {
    if (accountStore.isLogin) {
      return navigateTo("/");
    }
  }
});
