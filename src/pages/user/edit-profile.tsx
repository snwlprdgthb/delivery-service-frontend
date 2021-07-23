import React from "react";
import { useMe } from "../../hooks/useMe";
import { Button } from "../../components/button";
import { useForm } from "react-hook-form";
import {gql, useMutation, useApolloClient} from "@apollo/client"
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";
import { Helmet } from "react-helmet";

interface IFormProps {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
   mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
        ok,
        error
    }
   }
`

export const EditProfile = () => {
  const { data: userData, refetch } = useMe(); // all useQuery return refetch (async) for auto update cache from backend
  const client = useApolloClient();

  const { register, getValues, handleSubmit, formState } = useForm<IFormProps>({
      mode: "onChange",     // when update values
      defaultValues: {
          email: userData?.me.email
      }
  });

  const onCompleted = (data: editProfile) => {
      const {editProfile: {ok, error}} = data;
      if(ok && userData) {
          const {me: {email: prevEmail, id}} = userData;
          const {email: newEmail} = getValues();

             // await refetch(); // onCompleted must be async; we don't need calculation like below; slowly that another

          if(prevEmail !== newEmail) {
            client.writeFragment({
                id: `User:${id}`,
                fragment: gql`
                fragment EditedUser on User {
                    emailVerify,
                    email
                }  
                `,
                data: {
                    email: newEmail,
                    emailVerify: false
                }
            })
           
          }
      }

  }

  const [editProfileMutation, {loading}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
      onCompleted
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    editProfileMutation({
        variables: {
            input : {
                email,
                ...(password !== "" && {password})
            }
        }
    })
  };

  return (
    <div className="mt-36 flex flex-col justify-center items-center">
     <Helmet>
        <title>Edit Profile | Delivery Service</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 w-full max-w-screen-sm mt-5 mb-5"
      >
        <input
          {...register("email", {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
          className="inputHandle"
          type="email"
          placeholder="email"
          name="email"
          required
        />
        <input
          {...register("password", {})}
          name="password"
          className="inputHandle"
          type="password"
          placeholder="password"
        />
        <Button loading={loading} canClick={formState.isValid} actionText="Save Profile" />
      </form>
    </div>
  );
};
