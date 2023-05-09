import { render, screen } from "@testing-library/react";
import { FormInput } from "app/components/FormInput";

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
  test("should render Input with corresponding props", () => {
    render(<FormInput label="My Input" name="customInput" />);

    const inputElement = screen.getByRole("textbox", { name: "customInput" });

    expect(inputElement).toBeInTheDocument();
  });

  test("should render Input with error", () => {
    mockUseField.mockReturnValue({
      error: "Field is Not Valid",
      getInputProps: jest.fn((props) => props),
    } as unknown as FieldProps);

    render(<FormInput label="My Input" name="customInputWithError" />);

    const inputElement = screen.getByRole("textbox", {
      name: "customInputWithError",
    });
    expect(inputElement).toBeInTheDocument();

    // Where is the error
    const errorElement = screen.getByRole("alert");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("Field is Not Valid");
  });
});
