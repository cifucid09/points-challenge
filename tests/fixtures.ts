import type { TaxBracket } from "app/types";

export const FAKE_BRACKETS_2022_DATA: Array<TaxBracket> = [
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
];