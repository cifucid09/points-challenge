import type { BracketData, TaxBracket, TaxResult } from "~/types";
import { newArrayOfLength } from "app/utils";

export class TaxCalculatorService {
  calculateEffectiveTaxRate(annualIncome: number, totalTax: number): number {
    return totalTax / annualIncome;
  }

  /**
   * Heart of Tax calculation. This method would take a specific bracket and based on its values of min, max and rate would
   * calculate the tax for the provided annualIncome amount
   *
   * @param {TaxBracket} bracket
   * @param {number} annualIncome
   * @returns {number}
   */
  determineTaxOfBracket(bracket: TaxBracket, annualIncome: number): number {
    if (
      !bracket.max ||
      (bracket.max && bracket.min < annualIncome && annualIncome <= bracket.max)
    ) {
      return (annualIncome - bracket.min) * bracket.rate;
    } else {
      return (bracket.max - bracket.min) * bracket.rate;
    }
  }

  calculateTaxPerBracket(
    annualIncome: number,
    brackets: Array<TaxBracket>
  ): Array<BracketData> {
    const taxPerBracketCollection = newArrayOfLength<BracketData>(brackets, {
      bracket: { ...brackets[0] },
      taxAmount: 0,
    });
    let shouldComputeTax = true;

    for (let i = 0; i < brackets.length; i++) {
      const bracket = { ...brackets[i] };
      // We should determine the tax amount util we reach the bracket the salary fits
      taxPerBracketCollection[i].taxAmount = shouldComputeTax
        ? this.determineTaxOfBracket(bracket, annualIncome)
        : 0;
      taxPerBracketCollection[i].bracket = { ...bracket };
      if (
        bracket.max &&
        bracket.min < annualIncome &&
        annualIncome <= bracket.max
      ) {
        shouldComputeTax = false;
      }
    }

    return taxPerBracketCollection;
  }

  calculateTotalTax(taxPerBracket: Array<BracketData>): number {
    return taxPerBracket.reduce(
      (accu, bracketInfo) => accu + bracketInfo.taxAmount,
      0
    );
  }

  getCalculatedTax(
    annualIncome: number,
    brackets: Array<TaxBracket>
  ): TaxResult {
    // Special case if Annual Income is 0
    if (annualIncome === 0) {
      return {
        total: 0,
        byBracket: brackets.map((bracket) => ({ bracket, taxAmount: 0 })),
        effectiveRate: 0,
      };
    }

    const byBracket = this.calculateTaxPerBracket(annualIncome, brackets);
    const total = this.calculateTotalTax(byBracket);
    const effectiveRate = this.calculateEffectiveTaxRate(annualIncome, total);

    return {
      total,
      byBracket,
      effectiveRate,
    };
  }
}

const instance = new TaxCalculatorService();

export default instance;
