import { TaxCalculatorService } from "app/services/TaxCalculator";
import { FAKE_BRACKETS_2022_DATA } from "tests/fixtures";

describe("TextCalculator", () => {
  const instance = new TaxCalculatorService();
  test("Instance of", () => {
    expect(instance).toBeInstanceOf(TaxCalculatorService);
  });

  describe("getCalculatedTax", () => {
    test("Annual Income is CERO", () => {
      const calculatedTax = instance.getCalculatedTax(
        0,
        FAKE_BRACKETS_2022_DATA
      );

      expect(calculatedTax.total).toBe(0);
      expect(calculatedTax.effectiveRate).toBe(0);
      expect(calculatedTax.byBracket).toEqual([
        {
          bracket: {
            min: 0,
            max: 50197,
            rate: 0.15,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 50197,
            max: 100392,
            rate: 0.205,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 100392,
            max: 155625,
            rate: 0.26,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 155625,
            max: 221708,
            rate: 0.29,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 221708,
            rate: 0.33,
          },
          taxAmount: 0,
        },
      ]);
    });

    test("Annual Income is $50,000", () => {
      const calculatedTax = instance.getCalculatedTax(
        50000,
        FAKE_BRACKETS_2022_DATA
      );

      expect(calculatedTax.total).toBe(7500);
      expect(calculatedTax.effectiveRate).toBe(0.15);
      expect(calculatedTax.byBracket).toEqual([
        {
          bracket: {
            min: 0,
            max: 50197,
            rate: 0.15,
          },
          taxAmount: 7500,
        },
        {
          bracket: {
            min: 50197,
            max: 100392,
            rate: 0.205,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 100392,
            max: 155625,
            rate: 0.26,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 155625,
            max: 221708,
            rate: 0.29,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 221708,
            rate: 0.33,
          },
          taxAmount: 0,
        },
      ]);
    });

    test("Annual Income is $100,000", () => {
      const calculatedTax = instance.getCalculatedTax(
        100000,
        FAKE_BRACKETS_2022_DATA
      );

      expect(calculatedTax.total).toBe(17739.165);
      expect(calculatedTax.effectiveRate).toBe(0.17739165);
      expect(calculatedTax.byBracket).toEqual([
        {
          bracket: {
            min: 0,
            max: 50197,
            rate: 0.15,
          },
          taxAmount: 7529.549999999999,
        },
        {
          bracket: {
            min: 50197,
            max: 100392,
            rate: 0.205,
          },
          taxAmount: 10209.615,
        },
        {
          bracket: {
            min: 100392,
            max: 155625,
            rate: 0.26,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 155625,
            max: 221708,
            rate: 0.29,
          },
          taxAmount: 0,
        },
        {
          bracket: {
            min: 221708,
            rate: 0.33,
          },
          taxAmount: 0,
        },
      ]);
    });

    test("Annual Income is $1,234,567", () => {
      const calculatedTax = instance.getCalculatedTax(
        1234567,
        FAKE_BRACKETS_2022_DATA
      );

      expect(calculatedTax.total).toBe(385587.645);
      expect(calculatedTax.effectiveRate).toBe(0.31232622044814096);
      expect(calculatedTax.byBracket).toEqual([
        {
          bracket: {
            min: 0,
            max: 50197,
            rate: 0.15,
          },
          taxAmount: 7529.549999999999,
        },
        {
          bracket: {
            min: 50197,
            max: 100392,
            rate: 0.205,
          },
          taxAmount: 10289.974999999999,
        },
        {
          bracket: {
            min: 100392,
            max: 155625,
            rate: 0.26,
          },
          taxAmount: 14360.58,
        },
        {
          bracket: {
            min: 155625,
            max: 221708,
            rate: 0.29,
          },
          taxAmount: 19164.07,
        },
        {
          bracket: {
            min: 221708,
            rate: 0.33,
          },
          taxAmount: 334243.47000000003,
        },
      ]);
    });
  });
});
