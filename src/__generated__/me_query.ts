/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: me_query
// ====================================================

export interface me_query_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  emailVerify: boolean;
}

export interface me_query {
  me: me_query_me;
}
