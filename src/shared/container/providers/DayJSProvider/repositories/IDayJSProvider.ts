interface IDayJSProvider {
  dateNow(): number;
  expiresIn15Minutes(): number;
  compareDates(date01: number, date02: number): boolean
  converteDateToUnix(forecast: Date): number
}

export { IDayJSProvider };
