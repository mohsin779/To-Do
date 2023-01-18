import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import TodoDescription from "./TodoDescription";

describe("TodoDescription Component", () => {
  test("should render the description passed as props", () => {
    const text = "Lorem Ipsum...";
    render(<TodoDescription description={text} />);

    const paragraphElement = screen.getByText(text);

    expect(paragraphElement.innerHTML).toBe(text);
  });
});
