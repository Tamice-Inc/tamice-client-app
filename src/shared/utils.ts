import { PhoneNumberUtil } from "google-libphonenumber";
import { Country } from "react-phone-number-input";

class PhoneUtils {
  private phoneInstance: PhoneNumberUtil;

  constructor() {
    this.phoneInstance = PhoneNumberUtil.getInstance();
  }
  isValidNumber(number: string, code: Country): boolean {
    try {
      return this.phoneInstance.isValidNumberForRegion(
        this.phoneInstance.parse(number, code),
        code
      );
    } catch (error) {
      return false;
    }
  }

  getNationalCode(number: string): string | undefined | null {
    try {
      return this.phoneInstance.getRegionCodeForNumber(
        this.phoneInstance.parse(number)
      );
    } catch (error) {
      return;
    }
  }
}

export const phoneUtils = new PhoneUtils();

// Function to check if the object has item with null or empty value
export const hasNullOrEmptyValue = (obj: any) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === '') {
      return true; // Return true if a key has a value of null or an empty string
    }
  }
  return false; // Return false if no key has a value of null or an empty string
}
