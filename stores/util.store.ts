import { defineStore } from "pinia";

export const useUtilStore = defineStore("utilStore", () => {
  const globalLoading = ref(false);

  return { globalLoading };
});
