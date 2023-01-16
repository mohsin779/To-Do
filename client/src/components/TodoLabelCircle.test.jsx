import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import TodoLabelCircle from "./TodoLabelCircle";

describe("TodoLabelCircle Component", () => {
  test("should have the same background-color passed as props", () => {
    render(<TodoLabelCircle color="red" />);

    const spanElement = screen.getByTestId("circle");

    expect(spanElement).toHaveStyle("background-color:red");
  });
  test("should have the transparent background-color if no color is passed", () => {
    render(<TodoLabelCircle />);

    const spanElement = screen.getByTestId("circle");

    expect(spanElement).toHaveStyle("background-color:transparent");
  });
});
