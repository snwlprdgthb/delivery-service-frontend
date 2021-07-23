/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { getRestaByQueryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetRestaByQuery
// ====================================================

export interface GetRestaByQuery_getRestaByQuery_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface GetRestaByQuery_getRestaByQuery_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  bgImg: string;
  category: GetRestaByQuery_getRestaByQuery_restaurants_category | null;
  adress: string | null;
  isPromoted: boolean;
}

export interface GetRestaByQuery_getRestaByQuery {
  __typename: "getRestaByQueryOutput";
  ok: boolean;
  error: string | null;
  totalItems: number | null;
  totalPages: number | null;
  restaurants: GetRestaByQuery_getRestaByQuery_restaurants[] | null;
}

export interface GetRestaByQuery {
  getRestaByQuery: GetRestaByQuery_getRestaByQuery;
}

export interface GetRestaByQueryVariables {
  input: getRestaByQueryInput;
}
