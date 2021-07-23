import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
// import gql from "graphql-tag";
import Helmet from "react-helmet";
import { useMutation, gql, ApolloError } from "@apollo/client";
import logo from "../images/form-logo.svg";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables
} from "../__generated__/CreateAccountMutation";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    formState,
    formState: { errors },
    watch,
    handleSubmit,
    setError
  } = useForm<ICreateAccountForm>({
    mode: "onChange"
  });

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error }
    } = data;
    if (ok) {
      history.push("/");
    }
  };
  // const onError = (error: ApolloError) => {};

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult }
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
      onError: () => {}
    }
  );

  const isValid = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role
          }
        }
      });
    }
  };

  const isInvalid = () => {};

  return (
    <div className="h-screen  flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Delivery Service</title>
      </Helmet>
      <div className="w-full px-5 max-w-screen-sm flex flex-col items-center">
        <img src={logo} className="w-84 mb-10" />
        <h4 className="font-medium w-full text-3xl mb-5">Let's get started</h4>
        <form
          onSubmit={handleSubmit(isValid, isInvalid)}
          // onChange={handleSubmit(() => ())}
          className="grid gap-3 mt-5 mb-5 w-full"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
            required
            type="email"
            name="email"
            placeholder="email"
            className="inputHandle"
          />
          {errors.email && errors.email.type === "required" && (
            <FormError errorMessage={errors.email.message!} />
          )}
          {errors.email && errors.email.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}

          <input
            {...register("password", {
              required: "Password is required"
            })}
            required
            type="password"
            name="password"
            placeholder="password"
            className="inputHandle"
          />
          {errors.password && errors.password.type === "required" && (
            <FormError errorMessage={errors.password.message!} />
          )}

          <select
            {...register("role", { required: true })}
            className="inputHandle"
            name="role"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log in"}
          />
          {createAccountMutationResult &&
            createAccountMutationResult.createAccount.error && (
              <FormError
                errorMessage={createAccountMutationResult.createAccount.error}
              />
            )}
        </form>
        <div>
          Already have an acccount?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
