import { SHA256 } from "crypto-js";

namespace CommonUtils {
  export const generateHashPass = (password: string) => {
    return JSON.stringify(SHA256(password).words);
  };

  export const objectToParams = (obj: { [key: string]: any }) => {
    let str = "";
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
        if (str !== "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
      }
    }
    return str;
  };

  export const getOrdinal = (number: number) => {
    if (number === 0) {
      return "0th"; // Handle 0 separately
    }
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return number + "th"; // Special case for 11th, 12th, and 13th
    }

    switch (lastDigit) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
      default:
        return number + "th";
    }
  };
}

export default CommonUtils;
