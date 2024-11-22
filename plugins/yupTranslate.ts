import { setLocale, addMethod, string, number } from "yup";
import {
  phoneNumberValidator,
  verifyIranianNationalId,
  verifyCardNumber,
} from "@persian-tools/persian-tools";

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      default: "ورودی نامعتبر است",
      required: "${path}  را وارد کنید ",
    },
    string: {
      email: "ایمیل نامعتبر است",
      min: " حداقل مقدار ${path} ${min} کاراکتر است",
      url: "آدرس اینترنتی اشتباه است",
    },
    number: {
      min: " حداقل مقدار ${path} ${min} است",
    },
  });
  addMethod(string, "phoneNumber", function phoneNumber(phoneNumber: string) {
    return this.test(
      "phoneNumber",
      "شماره موبایل نامعتبر است",
      function (value) {
        if (value === undefined) return true;
        if (value.startsWith("0") == false) {
          return false;
        }
        return phoneNumberValidator(value?.toString()!);
      }
    );
  });
  addMethod(string, "cardNumber", function cardNumber(cardNumber: string) {
    return this.test("cardNumber", " شماره کارت نامعتبر است", function (value) {
      if (value === undefined) return true;
      return verifyCardNumber(Number(value?.toString()!));
    });
  });
  addMethod(string, "slug", function slug(slug: string) {
    return this.test(
      "slug",
      "این فیلد باید با کاراکتر های انگلیسی وارد شود",
      function (value) {
        if (value === undefined) return true;
        var res = /[^\u0000-\u00ff]/.test(value?.toString()!);
        if (res == true) {
          return false;
        }
        return true;
      }
    );
  });
  addMethod(
    string,
    "nationalCode",
    function nationalCode(nationalCode: string) {
      return this.test("nationalCode", " کد ملی نامعتبر است", function (value) {
        if (value === undefined) return true;
        return verifyIranianNationalId(value?.toString()) ?? false;
      });
    }
  );
});
