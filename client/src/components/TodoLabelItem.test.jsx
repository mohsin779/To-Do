import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import TodoLabelItem from "./TodoLabelItem";

describe("TodoLabelItem Component", () => {
  test("should render the same title passed as props", () => {
    render(<TodoLabelItem color="red" title="important" />);

    const paragraphElement = screen.getByText("important");

    expect(paragraphElement).toBeInTheDocument();
  });
  test("should have the same background-color passed as props", () => {
    render(<TodoLabelItem color="red" title="important" />);

    const spanElement = screen.getByTestId("circle-label");

    expect(spanElement).toHaveStyle("background-color:red");
  });
});
