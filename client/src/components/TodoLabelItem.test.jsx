import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { store } from "../stores";
import MockStore from "../utils/MockStore";
import TodoLabelItem from "./TodoLabelItem";

const Wrapper = props => {
  return (
    <MockStore store={store}>
      <TodoLabelItem {...props} />
    </MockStore>
  );
};

describe("TodoLabelItem Component", () => {
  test("should render the same title passed as props", () => {
    render(<Wrapper color="red" title="important" />);

    const paragraphElement = screen.getByText("important");

    expect(paragraphElement).toBeInTheDocument();
  });
  test("should have the same background-color passed as props", () => {
    render(<Wrapper color="red" title="important" />);

    const spanElement = screen.getByTestId("circle-label");

    expect(spanElement).toHaveStyle("background-color:red");
  });
  test("should render delete icon if delteable is passed", () => {
    render(<Wrapper color="red" title="important" deleteable />);

    const spanElement = document.querySelector(".del-label");

    expect(spanElement).toBeInTheDocument();
  });
});
