import type { TaxBracket } from "./types";

export function newArrayOfLength<t>(
  originalArray: Array<unknown>,
  filled: t
): Array<t> {
  if (typeof filled === "object") {
    return Array(originalArray.length)
      .fill(undefined)
      .map(() => ({ ...filled }));
  }

  return Array(originalArray.length)
    .fill(undefined)
    .map(() => filled);
}

export function numberToCurrency(number: number, decimals = 2) {
  return (
    "$" + number.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export function numberToPercentage(number: number, decimals = 2) {
  return (
    (number * 100).toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +
    "%"
  );
}

export function bracketToString(bracket: TaxBracket) {
  const { min, max } = bracket;
  const maxFormatValue = max ? `-${numberToCurrency(max)}` : "+";

  return `${numberToCurrency(min)}${maxFormatValue}`;
}
