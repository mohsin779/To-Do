import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Center from "./Center";
const html = `
Hello World
`;

const Wrapper = () => <Center>{html}</Center>;

describe("Center Component", () => {
  test("should render the same content passed as children", () => {
    render(<Wrapper />);
    const container = document.querySelector(".banner");
    expect(container.innerHTML).toBe(html);
  });
});
