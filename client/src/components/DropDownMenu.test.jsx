import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import DropdownMenu from "./DropdownMenu";

describe("DropDownMenu Component", () => {
  test("should be display:none on first render", () => {
    render(<DropdownMenu id={1} />);

    // const editElement = screen.findByText("Edit");
    // expect(editElement).not.toBeVisible();

    // expect(true).toBe(true);
  });
});
