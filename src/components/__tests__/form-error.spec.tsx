import React from "react";
import { render } from "@testing-library/react";
import { FormError } from "../form-error";

describe("<FormError />", () => {
  it("should render FormError with props", () => {
    const { getByText } = render(<FormError errorMessage="some" />);
    getByText("some");
  });
});
