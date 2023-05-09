export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type TaxResult = {
  total: number;
  byBracket: Array<BracketData>;
  effectiveRate: number;
};

export type BracketData = {
  bracket: TaxBracket;
  taxAmount: number;
};

export type TaxBracketResult = {
  tax_brackets: Array<TaxBracket>;
};
