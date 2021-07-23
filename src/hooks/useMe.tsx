import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { me_query } from "../__generated__/me_query";

export const QUERY_ME = gql`
  query me_query {
    me {
      id
      email
      role
      emailVerify
    }
  }
`;

export const useMe = () => {
  return useQuery<me_query>(QUERY_ME);
};
