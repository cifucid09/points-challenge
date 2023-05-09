import { render, screen } from "@testing-library/react";
import { TaxInformation } from "app/components//TaxInformation";
import type { TaxResult } from "app/types";

const TAX_DATA: TaxResult = {
  total: 17739.165,
  effectiveRate: 0.17739165,
  byBracket: [
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
  ],
};

describe("TaxInformation", () => {
  test("should render with corresponding content", () => {
    render(<TaxInformation title="Custom Tax Tabular data" data={TAX_DATA} />);

    // Has a title
    const contentsTitle = screen.getByRole("heading", {
      name: "Custom Tax Tabular data",
    });
    expect(contentsTitle).toBeInTheDocument();

    // Displays the total
    const contentsTaxTotal = screen.getByRole("definition", {
      name: "Total Tax",
    });
    expect(contentsTaxTotal).toHaveTextContent("$17,739.17");

    // Displays the rate
    const contentsEffectiveTaxRate = screen.getByRole("definition", {
      name: "Effective Tax Rate",
    });
    expect(contentsEffectiveTaxRate).toHaveTextContent("17.74%");

    // Has title on detail tax information
    const contentsTaxDetailHeader = screen.getByRole("rowheader", {
      name: "Bracket Tax",
    });
    expect(contentsTaxDetailHeader).toBeInTheDocument();

    // Detail tax information is formatted
    const contentsTaxDetailRows = screen.getAllByRole("row");
    expect(contentsTaxDetailRows[0]).toHaveTextContent(
      "$0.00-$50,197.00$7,529.55"
    );
  });
});
