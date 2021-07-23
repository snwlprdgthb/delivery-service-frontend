import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import {
  FindCategoryBySlug,
  FindCategoryBySlugVariables
} from "../../__generated__/FindCategoryBySlug";

interface IParams {
  slug: string;
}

const FIND_CAT_BY_SLUG = gql`
  query FindCategoryBySlug($input: findCategInput!) {
    findCategoryBySlug(input: $input) {
      ok
      error
      totalPages
      totalRes
      category {
        id
        name
        slug
        restaurants {
          ...RestaurantParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Category = () => {
  const params = useParams<IParams>();
  const { data, loading } = useQuery<
    FindCategoryBySlug,
    FindCategoryBySlugVariables
  >(FIND_CAT_BY_SLUG, {
    variables: {
      input: {
        page: 1,
        slug: params.slug
      }
    }
  });
  console.log(data);
  return <div>category</div>;
};
