import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Error from "./Error";

const MockError = () => {
  return <Error>Invalid Email</Error>;
};

describe("Error Component", () => {
  test("should render the same text passed as children", () => {
    const text = "Invalid Email";

    render(<MockError />);

    const paragraphElement = screen.getByText(text);

    expect(paragraphElement.innerHTML).toBe(text);
  });
});
