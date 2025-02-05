import { useUtilStore } from "~/stores/util.store";
import { ErrorOperation, SuccessOperation } from "~/utils/DefaultMessages";

export const usePrimeFunctions = () => {
  var dialog = useConfirm();
  const toast = useToast();
  const utilStore = useUtilStore();

  const deleteDialog = (
    message: string = "آیا از حذف اطمینان دارید ؟",
    header: string = "حذف",
    acceptFunction: Function,
    rejectFunction?: () => void
  ) => {
    dialog.require({
      message: message,
      header: header,
      icon: "pi pi-exclamation-triangle",
      rejectProps: {
        label: "منصرف شدم",
        severity: "danger",
        outlined: true,
      },
      acceptProps: {
        label: "بله حذف اش کن",
      },
      accept: async () => {
        utilStore.globalLoading = true;
        await acceptFunction!();
        utilStore.globalLoading = false;
      },
      reject: rejectFunction,
    });
  };
  const successToast = (title: string = SuccessOperation) => {
    toast.add({
      summary: title,
      life: 5000,
      severity: "success",
    });
  };
  const errorToast = (title: string = ErrorOperation) => {
    toast.add({
      summary: title,
      life: 5000,
      severity: "error",
    });
  };
  return { deleteDialog, successToast,errorToast };
};
