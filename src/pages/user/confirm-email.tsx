import React, { useEffect } from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables
} from "../../__generated__/verifyEmail";
import { useLocation, useHistory } from "react-router";
import { useMe } from "../../hooks/useMe";
import { Helmet } from "react-helmet";

const EMAIL_VERIFY_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    getVerify(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: verifyEmail) => {
    const {
      getVerify: { ok, error }
    } = data;

    console.log(error);
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
        fragment  VerifiedUser on User {
            emailVerify
        }
        `,
        data : {
            emailVerify: true
        }
      });
      history.push("/");
    }
  };

  const [verifyMutation, { loading, data, error }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(EMAIL_VERIFY_MUTATION, {
    onCompleted
  });

  useEffect(() => {
    // const [_, code] = window.location.href.split("code=");
    const code = "0.48n5jefes61";
    verifyMutation({
      variables: {
        input: {
          code
        }
      }
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
     <Helmet>
        <title>Confirm email | Delivery Service</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
