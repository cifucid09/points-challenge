export class TaxApiError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
