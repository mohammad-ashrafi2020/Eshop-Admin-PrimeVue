export function padTo2Digits(num: number) {
  return num.toString().padStart(2, "00");
}

export function convertMsToMinutesSeconds(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

export function convertScToMinutesSeconds(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 6000);
  const seconds = Math.round((milliseconds % 6000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

export function splitNumber(value: number | string | null) {
  if (value === null || value == undefined || value == 0) {
    return "0";
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const RangeNumber = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
export const IsNumberData = (data: any): boolean => {
  return !isNaN(data);
  
};

export const toTomanPrice = (rawNumber:number):string =>{
  return rawNumber.toLocaleString('fa-IR');
}
