/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { odrerStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderSubscr
// ====================================================

export interface orderSubscr_orderSubscr_driver {
  __typename: "User";
  email: string;
}

export interface orderSubscr_orderSubscr_customer {
  __typename: "User";
  email: string;
}

export interface orderSubscr_orderSubscr_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface orderSubscr_orderSubscr {
  __typename: "Order";
  id: number;
  status: odrerStatus;
  total: number | null;
  driver: orderSubscr_orderSubscr_driver | null;
  customer: orderSubscr_orderSubscr_customer | null;
  restaurant: orderSubscr_orderSubscr_restaurant | null;
}

export interface orderSubscr {
  orderSubscr: orderSubscr_orderSubscr;
}
