import type { AxiosInstance } from "axios";
import { TaxApi } from "app/api/TaxApi";
import { FAKE_BRACKETS_2022_DATA } from "tests/fixtures";

const FAKE_TAX_BRACKET_RESULT = {
  data: { tax_brackets: [...FAKE_BRACKETS_2022_DATA] },
};

describe("TaxApi", () => {
  const MOCKED_API_CLIENT = { get: jest.fn() } as unknown as AxiosInstance;
  let TaxApiInstance: TaxApi = new TaxApi(MOCKED_API_CLIENT);

  beforeEach(() => {
    (MOCKED_API_CLIENT.get as jest.Mock).mockResolvedValue(
      FAKE_TAX_BRACKET_RESULT
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Instance of", () => {
    expect(TaxApiInstance).toBeInstanceOf(TaxApi);
  });
  describe("getTaxRatesByYear", () => {
    test("successfully retrieves brackets information", async () => {
      const YEAR = 2022;
      const result = await TaxApiInstance.getTaxRatesByYear(YEAR);

      expect(MOCKED_API_CLIENT.get).toHaveBeenCalledWith(
        `/tax-calculator/tax-year/${YEAR}`
      );

      expect(result).toEqual([
        {
          min: 0,
          max: 50197,
          rate: 0.15,
        },
        {
          min: 50197,
          max: 100392,
          rate: 0.205,
        },
        {
          min: 100392,
          max: 155625,
          rate: 0.26,
        },
        {
          min: 155625,
          max: 221708,
          rate: 0.29,
        },
        {
          min: 221708,
          rate: 0.33,
        },
      ]);
    });

    test("throws if year value is invalid", async () => {
      const YEAR = "notANumber";

      await expect(
        // @ts-expect-error: We know it does not accept other than number at typecheck time, but we want to test our validation
        TaxApiInstance.getTaxRatesByYear(YEAR)
      ).rejects.toThrowError(
        `Year should be a number, got instead "notANumber, string"`
      );
    });
  });
});
