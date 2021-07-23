/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderInput, odrerStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: UpdateOrder
// ====================================================

export interface UpdateOrder_updateOrder_driver {
  __typename: "User";
  email: string;
}

export interface UpdateOrder_updateOrder_customer {
  __typename: "User";
  email: string;
}

export interface UpdateOrder_updateOrder_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface UpdateOrder_updateOrder {
  __typename: "Order";
  id: number;
  status: odrerStatus;
  total: number | null;
  driver: UpdateOrder_updateOrder_driver | null;
  customer: UpdateOrder_updateOrder_customer | null;
  restaurant: UpdateOrder_updateOrder_restaurant | null;
}

export interface UpdateOrder {
  updateOrder: UpdateOrder_updateOrder;
}

export interface UpdateOrderVariables {
  input: UpdateOrderInput;
}
