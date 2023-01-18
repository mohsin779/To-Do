import { render, screen } from "@testing-library/react";

import { describe, expect, test } from "vitest";
import { store } from "../stores";
import MockStore from "../utils/MockStore";
import TodoHeader from "./TodoHeader";

const mockItem = {
  _id: "63c66e3fa00ca5286deda989",
  title: "Mock Item",
  description: "Add a Description ",
  image:
    "https://res.cloudinary.com/dyppzmrda/image/upload/v1673948643/zooeo0pt5cvzcwcgjscd.png",
  status: false,
  labels: [
    {
      _id: "63c65890109e079a543c3591",
      title: "Important",
      color: "#d90d0d",
      __v: 0,
    },
    {
      _id: "63c6594f109e079a543c35b8",
      title: "lkj",
      color: "#000000",
      __v: 0,
    },
  ],
  __v: 0,
};

const Wrapper = () => {
  return (
    <MockStore store={store}>
      <TodoHeader item={mockItem} />
    </MockStore>
  );
};

describe("TodoHeader Component", () => {
  test("should display the title of item passed as props", () => {
    render(<Wrapper />);
    const h3Element = screen.getByText(mockItem.title);
    expect(h3Element).toBeInTheDocument();
  });
});
