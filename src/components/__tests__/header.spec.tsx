import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { QUERY_ME } from "../../hooks/useMe";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      const { debug, getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: QUERY_ME
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "email",
                    role: "role",
                    emailVerify: false
                  }
                }
              }
            }
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      getByText("Please verify your email");
    });
  });

  it("renders verify without banner", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: QUERY_ME
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "email",
                    role: "role",
                    emailVerify: true
                  }
                }
              }
            }
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      await expect(queryByText("Please verify your email")).toBeNull();
    });
  });
});
