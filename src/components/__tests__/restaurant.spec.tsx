import React from "react";
import { render } from "@testing-library/react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("Should render Restaurant with props", () => {
    const RestaProps = {
      bgImg: "bgImg",
      name: "name",
      categoryName: "categoryName",
      id: "id"
    };
    const { debug, container, getByText } = render(
      <Router>
        <Restaurant {...RestaProps} />
      </Router>
    );
    getByText(RestaProps.name);
    getByText(RestaProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${RestaProps.id}`
    );
  });
});
