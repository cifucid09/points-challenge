import { render, screen } from "@testing-library/react";
import { FormInputCurrency } from "app/components//FormInputCurrency";

import type { FieldProps } from "remix-validated-form";
import { useField } from "remix-validated-form";

jest.mock("remix-validated-form");

const mockUseField = useField as jest.MockedFunction<typeof useField>;

describe("Input", () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      getInputProps: jest.fn((props) => props),
    } as unknown as FieldProps);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  test("should render Currency Input", () => {
    render(
      <FormInputCurrency label="My Input" name="currencyInput" currency="MXN" />
    );

    const inputElement = screen.getByRole("textbox", { name: "currencyInput" });
    expect(inputElement).toBeInTheDocument();

    const currencySign = screen.getByText("$");
    expect(currencySign).toBeInTheDocument();

    const currency = screen.getByText("MXN");
    expect(currency).toBeInTheDocument();
  });
});
