/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyEmailInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: verifyEmail
// ====================================================

export interface verifyEmail_getVerify {
  __typename: "VerifyEmailOutput";
  ok: boolean;
  error: string | null;
}

export interface verifyEmail {
  getVerify: verifyEmail_getVerify;
}

export interface verifyEmailVariables {
  input: VerifyEmailInput;
}
