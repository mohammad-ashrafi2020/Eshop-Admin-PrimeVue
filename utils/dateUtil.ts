import { remainingTime } from "@persian-tools/persian-tools";
import { padTo2Digits } from "./numberUtils";
import moment from "moment";

export const toPersianDate = (
  date: Date,
  withTime: boolean = false,
  withDashBetweenTimeAndDate: boolean = false
): string => {
  let pDate = new Date(date).toLocaleDateString("fa-IR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (withTime) {
    var time = new Date(date).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    if (withDashBetweenTimeAndDate) {
      return pDate + " ـ " + time;
    }
    return pDate + " " + time;
  } else {
    return pDate;
  }
};
export const TimeAgo = (date: Date) => {
  const currentDate = moment();
  const pastDate = moment(date);
  const daysPassed = currentDate.diff(pastDate, "days");
  const hoursePassed = currentDate.diff(pastDate, "hours");
  var result = "";
  if (daysPassed == 0) {
    if (hoursePassed == 0) {
      result = `لحظاتی `;
    } else {
      result = `${hoursePassed} ساعت`;
    }
  } else if (daysPassed < 29) {
    result = `${daysPassed} روز`;
  } else if (daysPassed < 360) {
    result = `${Math.floor(daysPassed / 30)} ماه`;
  } else {
    result = `${Math.floor(daysPassed / 360)} سال`;
  }
  return `${result}  پیش`;
};

export const RemainingTime = (date: Date, justByDay: boolean = true) => {
  var res = remainingTime(date);
  var days = res.days;
  var result = "";
  if (res.years >= 1) {
    days += res.years * 365;
  }
  if (res.months >= 1) {
    days += res.months * 30;
  }
  if (days > 0) {
    result += `${days} روز و `;
  }
  if (justByDay) {
    return `${days} روز و ${res.hours} ساعت`;
  }
  var hours = res.hours.toString();
  var minutes = res.minutes.toString();
  var seconds = res.seconds.toString();
  if (res.hours < 10) {
    hours = `0${res.hours}`;
  }
  if (res.minutes < 10) {
    minutes = `0${res.minutes}`;
  }
  if (res.seconds < 10) {
    seconds = `0${res.seconds}`;
  }
  result += ` ${hours}:${minutes}:${seconds}`;
  if (result == "00:00:00") {
    return "0";
  }

  return result;
};
export const fixNumbers = (str: string) => {
  var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];
  if (typeof str === "string") {
    for (var i: any = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

export const getPersianDate = (date: Date, format: string | null = null) => {
  let week = new Array(
    "يكشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه"
  );
  let months = new Array(
    "فروردين",
    "ارديبهشت",
    "خرداد",
    "تير",
    "مرداد",
    "شهريور",
    "مهر",
    "آبان",
    "آذر",
    "دي",
    "بهمن",
    "اسفند"
  );
  let today = new Date(date);
  let d = today.getDay();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if (process.server == false) {
    year = window.navigator.userAgent.indexOf("MSIE") > 0 ? year : 1900 + year;
  }
  if (year == 0) {
    year = 2000;
  }
  if (year < 100) {
    year += 1900;
  }
  let y = 1;
  for (let i = 0; i < 3000; i += 4) {
    if (year == i) {
      y = 2;
    }
  }
  for (let i = 1; i < 3000; i += 4) {
    if (year == i) {
      y = 3;
    }
  }
  if (y == 1) {
    year -= month < 3 || (month == 3 && day < 21) ? 622 : 621;
    switch (month) {
      case 1:
        day < 21 ? ((month = 10), (day += 10)) : ((month = 11), (day -= 20));
        break;
      case 2:
        day < 20 ? ((month = 11), (day += 11)) : ((month = 12), (day -= 19));
        break;
      case 3:
        day < 21 ? ((month = 12), (day += 9)) : ((month = 1), (day -= 20));
        break;
      case 4:
        day < 21 ? ((month = 1), (day += 11)) : ((month = 2), (day -= 20));
        break;
      case 5:
      case 6:
        day < 22 ? ((month -= 3), (day += 10)) : ((month -= 2), (day -= 21));
        break;
      case 7:
      case 8:
      case 9:
        day < 23 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 22));
        break;
      case 10:
        day < 23 ? ((month = 7), (day += 8)) : ((month = 8), (day -= 22));
        break;
      case 11:
      case 12:
        day < 22 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 21));
        break;
      default:
        break;
    }
  }
  if (y == 2) {
    year -= month < 3 || (month == 3 && day < 20) ? 622 : 621;
    switch (month) {
      case 1:
        day < 21 ? ((month = 10), (day += 10)) : ((month = 11), (day -= 20));
        break;
      case 2:
        day < 20 ? ((month = 11), (day += 11)) : ((month = 12), (day -= 19));
        break;
      case 3:
        day < 20 ? ((month = 12), (day += 10)) : ((month = 1), (day -= 19));
        break;
      case 4:
        day < 20 ? ((month = 1), (day += 12)) : ((month = 2), (day -= 19));
        break;
      case 5:
        day < 21 ? ((month = 2), (day += 11)) : ((month = 3), (day -= 20));
        break;
      case 6:
        day < 21 ? ((month = 3), (day += 11)) : ((month = 4), (day -= 20));
        break;
      case 7:
        day < 22 ? ((month = 4), (day += 10)) : ((month = 5), (day -= 21));
        break;
      case 8:
        day < 22 ? ((month = 5), (day += 10)) : ((month = 6), (day -= 21));
        break;
      case 9:
        day < 22 ? ((month = 6), (day += 10)) : ((month = 7), (day -= 21));
        break;
      case 10:
        day < 22 ? ((month = 7), (day += 9)) : ((month = 8), (day -= 21));
        break;
      case 11:
        day < 21 ? ((month = 8), (day += 10)) : ((month = 9), (day -= 20));
        break;
      case 12:
        day < 21 ? ((month = 9), (day += 10)) : ((month = 10), (day -= 20));
        break;
      default:
        break;
    }
  }
  if (y == 3) {
    year -= month < 3 || (month == 3 && day < 21) ? 622 : 621;
    switch (month) {
      case 1:
        day < 20 ? ((month = 10), (day += 11)) : ((month = 11), (day -= 19));
        break;
      case 2:
        day < 19 ? ((month = 11), (day += 12)) : ((month = 12), (day -= 18));
        break;
      case 3:
        day < 21 ? ((month = 12), (day += 10)) : ((month = 1), (day -= 20));
        break;
      case 4:
        day < 21 ? ((month = 1), (day += 11)) : ((month = 2), (day -= 20));
        break;
      case 5:
      case 6:
        day < 22 ? ((month -= 3), (day += 10)) : ((month -= 2), (day -= 21));
        break;
      case 7:
      case 8:
      case 9:
        day < 23 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 22));
        break;
      case 10:
        day < 23 ? ((month = 7), (day += 8)) : ((month = 8), (day -= 22));
        break;
      case 11:
      case 12:
        day < 22 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 21));
        break;
      default:
        break;
    }
  }

  var ye = new Date(date).toLocaleDateString("fa-IR").split("/")[0];
  var dayy = new Date(date).toLocaleDateString("fa-IR").split("/")[2];
  if (format === null || format === undefined)
    return `${dayy} ${months[month - 1]} ${ye}`;
  if (format === "y/m/d") return `${year}/${month}/${day}`;
  if (format === "y") return `${ye}`;
  if (format === "M") return `${months[month - 1]}`;
  if (format === "d/m/y") return `${day}/${month}/${year}`;
  if (format === "M/dd/D") return `${week[d]} ${day} ${months[month - 1]}`; //چهارشنبه 12 مرداد
  if (format === "M/dd/D/y")
    return `${week[d]} ${dayy} ${months[month - 1]} ${ye}`; //1403 چهارشنبه 12 مرداد
  if (format === "M/dd") return `${day} ${months[month - 1]}`; //3 شهريور
  if (format === "y/M/dd")
    return ` ${padTo2Digits(day)} / ${months[month - 1]} / ${ye}`; //04 / شهريور / ۱۴۰۱
};

export const GetTime = (date: Date): string => {
  var hours = date.getHours().toString();
  hours = ("0" + hours).slice(-2);
  var min = date.getMinutes().toString();
  min = ("0" + min).slice(-2);

  return `${hours}:${min}`;
};
export const GetTimeNumber = (date: Date): string => {
  var hours = date.getHours().toString();
  hours = ("0" + hours).slice(-2);
  var min = date.getMinutes().toString();
  min = ("0" + min).slice(-2);
  var seconds = date.getSeconds().toString();
  seconds = ("0" + seconds).slice(-2);

  return `${hours}${min}${seconds}`;
};
export const GetTimeNumberWithOutSeconds = (date: Date): string => {
  var hours = date.getHours().toString();
  hours = ("0" + hours).slice(-2);
  var min = date.getMinutes().toString();
  min = ("0" + min).slice(-2);

  return `${hours}${min}`;
};
export function MinutesToDuration(s: string) {
  var minutes = Number(s.split(":")[1].trim());
  var days = Math.floor(minutes / 1440);
  minutes = minutes - days * 1440;
  var hours = Math.floor(minutes / 60);
  minutes = minutes - hours * 60;
  var dur = "PT";
  if (days > 0) {
    dur += days + "D";
  }
  if (hours > 0) {
    dur += hours + "H";
  }
  dur += minutes + "M";

  return dur;
}
export const AddMinutes = (date: Date, minutes: number) => {
  var current = new Date(date);
  current.setMinutes(current.getMinutes() + minutes);
  return current;
};
export const AddDays = (date: Date, days: number) => {
  var current = new Date(date);
  current.setDate(current.getDate() + days);
  return current;
};
export const MinesDays = (date: Date, days: number) => {
  var current = new Date(date);
  current.setDate(current.getDate() - days);
  return current;
};
export const MinesHours = (date: Date, hours: number) => {
  var current = new Date(date);
  current.setHours(current.getHours() - hours);
  return current;
};
export const GetDateWithOutTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
export const AddSeconds = (date: Date, seconds: number) => {
  var current = new Date(date);
  current.setSeconds(current.getSeconds() + seconds);
  return current;
};
export const convertUnixTime = (unixtime: number) => {
  // Check if the unixtime is in milliseconds (more than 10 digits)
  if (unixtime.toString().length > 10) {
    // Convert milliseconds to seconds
    return Math.floor(unixtime / 1000);
  }
  // If it's already in seconds, return it as is
  return unixtime;
};
export const harold = (num: any) => {
  return (num > 9 ? "" : "0") + num;
};
