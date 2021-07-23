import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { Helmet } from "react-helmet";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import {
  GetRestaByQuery,
  GetRestaByQueryVariables
} from "../../__generated__/GetRestaByQuery";

const SEARCH_RESTA_BY_QUERY = gql`
  query GetRestaByQuery($input: getRestaByQueryInput!) {
    getRestaByQuery(input: $input) {
      ok
      error
      totalItems
      totalPages
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();

  const [getLazyQuery, { data, loading, called }] = useLazyQuery<
    GetRestaByQuery,
    GetRestaByQueryVariables
  >(SEARCH_RESTA_BY_QUERY);

  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    getLazyQuery({
      variables: {
        input: {
          page: 1,
          query
        }
      }
    });
  }, [history, location]);
  console.log(data, loading, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      search
    </div>
  );
};
