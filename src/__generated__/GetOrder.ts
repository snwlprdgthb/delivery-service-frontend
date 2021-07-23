/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, odrerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_getOrder_Order_driver {
  __typename: "User";
  email: string;
}

export interface GetOrder_getOrder_Order_customer {
  __typename: "User";
  email: string;
}

export interface GetOrder_getOrder_Order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface GetOrder_getOrder_Order {
  __typename: "Order";
  id: number;
  status: odrerStatus;
  total: number | null;
  driver: GetOrder_getOrder_Order_driver | null;
  customer: GetOrder_getOrder_Order_customer | null;
  restaurant: GetOrder_getOrder_Order_restaurant | null;
}

export interface GetOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  Order: GetOrder_getOrder_Order | null;
}

export interface GetOrder {
  getOrder: GetOrder_getOrder;
}

export interface GetOrderVariables {
  input: GetOrderInput;
}
