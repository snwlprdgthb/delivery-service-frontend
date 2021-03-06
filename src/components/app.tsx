import React from "react";
import { LoggedOutRouter } from "../routers/logged-out-router";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
import { LoggedInRouter } from "../routers/logged-in-router";
import { isLoggedInVar } from "../apollo";

// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `;

export const App = () => {
  // const { data } = useQuery(IS_LOGGED_IN);
  // const { isLoggedIn } = data;
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
