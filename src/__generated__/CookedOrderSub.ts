/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { odrerStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: CookedOrderSub
// ====================================================

export interface CookedOrderSub_cookedOrderSub_driver {
  __typename: "User";
  email: string;
}

export interface CookedOrderSub_cookedOrderSub_customer {
  __typename: "User";
  email: string;
}

export interface CookedOrderSub_cookedOrderSub_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface CookedOrderSub_cookedOrderSub {
  __typename: "Order";
  id: number;
  status: odrerStatus;
  total: number | null;
  driver: CookedOrderSub_cookedOrderSub_driver | null;
  customer: CookedOrderSub_cookedOrderSub_customer | null;
  restaurant: CookedOrderSub_cookedOrderSub_restaurant | null;
}

export interface CookedOrderSub {
  cookedOrderSub: CookedOrderSub_cookedOrderSub;
}
