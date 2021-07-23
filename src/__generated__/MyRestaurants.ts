/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyRestaurants
// ====================================================

export interface MyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface MyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  bgImg: string;
  category: MyRestaurants_myRestaurants_restaurants_category | null;
  adress: string | null;
  isPromoted: boolean;
}

export interface MyRestaurants_myRestaurants {
  __typename: "MyRestaOutput";
  ok: boolean;
  error: string | null;
  restaurants: MyRestaurants_myRestaurants_restaurants[] | null;
}

export interface MyRestaurants {
  myRestaurants: MyRestaurants_myRestaurants;
}
