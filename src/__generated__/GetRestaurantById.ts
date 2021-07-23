/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { getRestaByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetRestaurantById
// ====================================================

export interface GetRestaurantById_getRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface GetRestaurantById_getRestaurantById_restaurant_dishes_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface GetRestaurantById_getRestaurantById_restaurant_dishes_options {
  __typename: "DishOptions";
  name: string;
  extra: number | null;
  choices: GetRestaurantById_getRestaurantById_restaurant_dishes_options_choices[] | null;
}

export interface GetRestaurantById_getRestaurantById_restaurant_dishes {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: GetRestaurantById_getRestaurantById_restaurant_dishes_options[] | null;
}

export interface GetRestaurantById_getRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  bgImg: string;
  category: GetRestaurantById_getRestaurantById_restaurant_category | null;
  adress: string | null;
  isPromoted: boolean;
  dishes: GetRestaurantById_getRestaurantById_restaurant_dishes[];
}

export interface GetRestaurantById_getRestaurantById {
  __typename: "getRestaByIdOutput";
  ok: boolean;
  error: string | null;
  restaurant: GetRestaurantById_getRestaurantById_restaurant | null;
}

export interface GetRestaurantById {
  getRestaurantById: GetRestaurantById_getRestaurantById;
}

export interface GetRestaurantByIdVariables {
  input: getRestaByIdInput;
}
