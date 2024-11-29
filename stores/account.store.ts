import type { ToastMessageOptions } from "primevue/toast";
import type { LoginData } from "~/models/auth/LoginData";

export const useAccountStore = defineStore("account", () => {
  const toast = useToast();
  const tokenCookieName = "auth-token";
  
  const getToken = computed(() => {
    return useCookie(tokenCookieName).value;
  });
  const isLogin = computed(() => {
    return useCookie(tokenCookieName).value != undefined;
  });
  const setAuthToken = (data: LoginData) => {
    var cookie = useCookie(tokenCookieName);
    cookie.value = data.token;
  };
  const setAlertOutsideOfScriptSetup = (message: ToastMessageOptions) => {
    toast.add(message);
  };

  return { setAlertOutsideOfScriptSetup, isLogin, getToken, setAuthToken };
});
