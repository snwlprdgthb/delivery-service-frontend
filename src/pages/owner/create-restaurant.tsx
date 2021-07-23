import React, { useState } from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import {
  CreateRestaurant,
  CreateRestaurantVariables
} from "../../__generated__/CreateRestaurant";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Helmet } from "react-helmet";
import { FormError } from "../../components/form-error";
import { MY_RESTA_QUERY } from "./my-restaurants";
import { useHistory } from "react-router";

const MUTATION_CREATE_RESTA = gql`
  mutation CreateRestaurant($createRestaInput: CreateRestaurantInput!) {
    createRestaurant(input: $createRestaInput) {
      ok
      error
      restaId
    }
  }
`;

interface IForm {
  name: string;
  adress: string;
  categoryName: string;
  file: FileList;
}

export const CreateNewRestaurant = () => {
  const [uploading, setUploading] = useState(false);
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const client = useApolloClient();

  const onCompleted = (data: CreateRestaurant) => {
    const {
      createRestaurant: { ok, error, restaId }
    } = data;
    if (ok) {
          const { name, adress, categoryName } = getValues();
      setUploading(false);
      // update apollo cache for get current value without network request
            const  queryResult  = client.readQuery({query: MY_RESTA_QUERY})
            client.writeQuery({
              query: MY_RESTA_QUERY,
              data: {
                  myRestaurants : {
                     ...queryResult.myRestaurants,
                     restaurants: [
                         {adress,
                        bgImg: imageUrl,
                         category:
                        { name: categoryName,
                         __typename: "Category"
                       },
                         id: restaId,
                         isPromoted: false,
                         name,
                         __typename: "Restaurant"},
                         ...queryResult.myRestaurants.restaurants]
                  }
              }
          })
   history.push("/");
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<
    CreateRestaurant,
    CreateRestaurantVariables
  >(MUTATION_CREATE_RESTA, { onCompleted, 
    // refetchQueries: [{query: MY_RESTA_QUERY}] 
});

  const { handleSubmit, register, getValues, formState } = useForm<IForm>({
    mode: "onChange"
  });

  const onSubmit = async () => {
    setUploading(true);
    try {
      const { file, name, adress, categoryName } = getValues();
      const actualFile = file[0];

      const formBody = new FormData();
      formBody.append("file", actualFile);

      const { url: bgImg } = await (await fetch(
        "http://localhost:4000/uploads/",
        {
          method: "POST",
          body: formBody
        }
      )).json();
   setImageUrl(bgImg);
      createRestaurantMutation({
        variables: {
          createRestaInput: {
            name,
            categoryName,
            adress,
            bgImg
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container flex flex-col items-center">
      <Helmet>
        <title>Create Restaurant | Delivery Service</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3 mt-52">Create Restaurant</h4>
      <form
        className="max-w-screen-sm w-full grid gap-3 mt-5 mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", {
            required: "Name is required"
          })}
          type="text"
          name="name"
          className="inputHandle"
          placeholder="Name"
        />
        <input
          {...register("adress", {
            required: "Adress is required"
          })}
          type="text"
          name="adress"
          className="inputHandle"
          placeholder="Adress"
        />
        <input
          {...register("categoryName", {
            required: "Category Name is required"
          })}
          type="text"
          name="categoryName"
          className="inputHandle"
          placeholder="Category Name"
        />
        <div>
          <input
            {...register("file", {
              required: "File is required"
            })}
            accept="image/*"
            type="file"
            name="file"
          />
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText={"Create Restaurant"}
        />
      </form>
      {data?.createRestaurant?.error && (<FormError errorMessage={data.createRestaurant.error} />)}
    </div>
  );
};
