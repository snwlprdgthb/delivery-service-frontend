import React from "react";
import { render, waitFor } from "@testing-library/react";
import { NotFound } from "../404";
import { BrowserRouter as Router } from "react-router-dom";
import HelmetProvider from "react-helmet";

describe("<NotFound />", () => {
  it("Should render NotFound", async () => {
    const { getByText } = render(
      <Router>
        <NotFound />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe("Not Found | Delivery Service");
    });
  });
});
