import React from "react";
import { render } from "@testing-library/react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render Button with props", () => {
    const { getByText, container } = render(
      <Button canClick={true} loading={false} actionText={"some"} />
    );
    getByText("some");
    expect(container.firstChild).toHaveClass("hover:bg-lime-800");
  });
  it("should button show loading", () => {
    const { debug, getByText, container } = render(
      <Button canClick={false} loading={true} actionText={"some"} />
    );
    getByText("Loading...");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
