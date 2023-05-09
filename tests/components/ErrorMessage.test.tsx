import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "app/components/ErrorMessage";
describe("ErrorMessage", () => {
  test("should render with error message", () => {
    const errorMessage = "An error was found";

    render(<ErrorMessage error={errorMessage} />);

    const element = screen.getByText(errorMessage);

    expect(element).toBeInTheDocument();
  });
});
