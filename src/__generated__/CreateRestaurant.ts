/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRestaurant
// ====================================================

export interface CreateRestaurant_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaId: number | null;
}

export interface CreateRestaurant {
  createRestaurant: CreateRestaurant_createRestaurant;
}

export interface CreateRestaurantVariables {
  createRestaInput: CreateRestaurantInput;
}
