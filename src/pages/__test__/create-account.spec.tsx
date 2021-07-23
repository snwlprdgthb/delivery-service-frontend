import React, { forwardRef } from "react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import { render, waitFor, RenderResult } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../__generated__/globalTypes";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush
      };
    }
  };
});

describe("<CreateAccount />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Delivery Service");
    });
  });

  it("render validation errors", async () => {
    const { getByPlaceholderText, getByText, getByRole } = renderResult;
    const email = getByPlaceholderText("email");
    const btn = getByRole("btn");
    await waitFor(() => {
      userEvent.type(email, "not@valid");
    });
    getByText("Please enter a valid email");
    await waitFor(() => {
      userEvent.clear(email);
    });
    getByText("Email is required");
    await waitFor(() => {
      userEvent.type(email, "yeah@valid.email");
      userEvent.click(btn);
    });
    getByText("Password is required");
  });

  it("submits mutation with form value", async () => {
    const { getByPlaceholderText, getByText, getByRole } = renderResult;
    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    const btn = getByRole("btn");
    const submitData = {
      email: "real@test.email",
      password: "realpassword",
      role: UserRole.Client
    };

    const mockedCreateAccountMutationRes = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "error"
        }
      }
    });

    mockClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreateAccountMutationRes
    );

    await waitFor(() => {
      userEvent.type(email, submitData.email);
      userEvent.type(password, submitData.password);
      userEvent.click(btn);
    });

    expect(mockedCreateAccountMutationRes).toHaveBeenCalledTimes(1);
    expect(mockedCreateAccountMutationRes).toHaveBeenCalledWith({
      createAccountInput: {
        email: submitData.email,
        password: submitData.password,
        role: submitData.role
      }
    });
    expect(mockPush).toHaveBeenCalledWith("/");
    getByText("error");
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
