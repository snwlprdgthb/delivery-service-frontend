import React, { forwardRef } from "react";
import { render, waitFor, RenderResult } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login, LOGIN_MUTATION } from "../login";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <Router>
            <Login />
          </Router>
        </ApolloProvider>
      );
    });
  });

  it("should render Login", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Delivery Service");
    });
  });

  it("displays email with valid error", async () => {
    const { getByPlaceholderText, getByText } = renderResult;
    const email = getByPlaceholderText("email");
    await waitFor(() => {
      userEvent.type(email, "some@wont");
    });
    getByText("Please enter a valid email");
    await waitFor(() => {
      userEvent.clear(email);
    });
    getByText("Email is required");
  });

  it("display button and password required error", async () => {
    const { getByPlaceholderText, getByText, getByRole } = renderResult;
    const email = getByPlaceholderText("email");
    const btn = getByRole("btn");
    await waitFor(() => {
      userEvent.type(email, "some@will.com");
      userEvent.click(btn);
    });
    getByText("Password is required");
  });

  it("submits form and call mutations", async () => {
    const { getByPlaceholderText, getByText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    const btn = getByRole("btn");
    const submitData = {
      email: "real@test.email",
      password: "realpassword"
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: "error"
        }
      }
    });
    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await waitFor(() => {
      userEvent.type(email, submitData.email);
      userEvent.type(password, submitData.password);
      userEvent.click(btn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: submitData.email,
        password: submitData.password
      }
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("tuber-token", "XXX");
    getByText("error");
  });
});
