/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDish
// ====================================================

export interface CreateDish_createDish {
  __typename: "createDishOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateDish {
  createDish: CreateDish_createDish;
}

export interface CreateDishVariables {
  input: createDishInput;
}
