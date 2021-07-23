/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaQuery
// ====================================================

export interface restaQuery_getAllCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  bgImg: string | null;
  restaCount: number;
}

export interface restaQuery_getAllCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaQuery_getAllCategories_categories[] | null;
}

export interface restaQuery_restaurantsPagination_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaQuery_restaurantsPagination_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  bgImg: string;
  category: restaQuery_restaurantsPagination_restaurants_category | null;
  adress: string | null;
  isPromoted: boolean;
}

export interface restaQuery_restaurantsPagination {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalItems: number | null;
  restaurants: restaQuery_restaurantsPagination_restaurants[] | null;
}

export interface restaQuery {
  getAllCategories: restaQuery_getAllCategories;
  restaurantsPagination: restaQuery_restaurantsPagination;
}

export interface restaQueryVariables {
  input: RestaurantsInput;
}
