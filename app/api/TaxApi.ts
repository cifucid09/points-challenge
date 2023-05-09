import type { AxiosInstance } from "axios";
import api from "./config";
import type { TaxBracket, TaxBracketResult } from "app/types";
import { TaxApiError } from "app/errors/TaxApiError";

export class TaxApi {
  constructor(public apiClient: AxiosInstance) {}

  async getTaxRatesByYear(year: number): Promise<Array<TaxBracket>> {
    try {
      if (!Number.isInteger(year)) {
        throw new Error(
          `Year should be a number, got instead "${year}, ${typeof year}"`
        );
      }
      // Fetch Tax Year stuff
      const result = await this.apiClient.get<TaxBracketResult>(
        `/tax-calculator/tax-year/${year}`
      );

      // TODO: This should really be a logger were we could set the log level (and various other logs around ... )
      console.debug("getTaxRatesByYear result", result);

      return result.data.tax_brackets;
    } catch (error) {
      console.error("Error fetching Tax Rates by year information", error);
      throw new TaxApiError((error as Error).message);
    }
  }
}

const instance = new TaxApi(api);

export default instance;
