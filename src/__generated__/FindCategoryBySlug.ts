/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { findCategInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindCategoryBySlug
// ====================================================

export interface FindCategoryBySlug_findCategoryBySlug_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface FindCategoryBySlug_findCategoryBySlug_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  bgImg: string;
  category: FindCategoryBySlug_findCategoryBySlug_category_restaurants_category | null;
  adress: string | null;
  isPromoted: boolean;
}

export interface FindCategoryBySlug_findCategoryBySlug_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  restaurants: FindCategoryBySlug_findCategoryBySlug_category_restaurants[];
}

export interface FindCategoryBySlug_findCategoryBySlug {
  __typename: "findCategOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalRes: number | null;
  category: FindCategoryBySlug_findCategoryBySlug_category | null;
}

export interface FindCategoryBySlug {
  findCategoryBySlug: FindCategoryBySlug_findCategoryBySlug;
}

export interface FindCategoryBySlugVariables {
  input: findCategInput;
}
