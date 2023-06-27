import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDayJSProvider } from "../repositories/IDayJSProvider";

dayjs.extend(utc);

class DayJSProvider implements IDayJSProvider {
  dateNow(): number {
    return dayjs().unix();
  }

  expiresIn15Minutes(): number {
    return dayjs().add(15, "minutes").unix();
  }

  compareDates(date01: number, date02: number): boolean {
    return dayjs(date01).isBefore(date02);
  }

  converteDateToUnix(forecastDate: Date): number {
    return dayjs(forecastDate).unix();
  }
}

export { DayJSProvider };
