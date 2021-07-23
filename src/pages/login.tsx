import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
// import gql from "graphql-tag";
import Helmet from "react-helmet";
import { useMutation, gql, ApolloError } from "@apollo/client";
import {
  LoginMutation,
  LoginMutationVariables
} from "../__generated__/LoginMutation";
import logo from "../images/form-logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { isLoggedInVar, authTokenVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface IForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState,
    formState: { errors },
    watch,
    handleSubmit,
    setError
  } = useForm<IForm>({
    mode: "onChange"
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token }
    } = data;

    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const onError = (error: ApolloError) => {};

  const [
    loginMutation,
    { loading, error, data: LoginMutationResult }
  ] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
    onError
  });

  const isValid = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password
          }
        }
      });
    }
  };

  const isInvalid = () => {
    // console.log("Some error with validation form");
  };

  return (
    <div className="h-screen  flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Delivery Service</title>
      </Helmet>
      <div className="w-full px-5 max-w-screen-sm flex flex-col items-center">
        <img src={logo} className="w-84 mb-10" />
        <h4 className="font-medium w-full text-3xl mb-5">Welcome back</h4>
        <form
          onSubmit={handleSubmit(isValid, isInvalid)}
          // onChange={handleSubmit(() => console.log(errors))}
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

          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log in"}
          />
          {LoginMutationResult && LoginMutationResult.login.error && (
            <FormError errorMessage={LoginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Uber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
