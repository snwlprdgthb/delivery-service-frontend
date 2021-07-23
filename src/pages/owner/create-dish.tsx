import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Button } from "../../components/button";
import { QUERY_RESTAURANT } from "./my-restaurant";
import {
  CreateDish,
  CreateDishVariables
} from "../../__generated__/CreateDish";

interface IParams {
  id: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

const CREATE_DISH = gql`
  mutation CreateDish($input: createDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const AddDish = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();

  const [createDishMutation, { loading }] = useMutation<
    CreateDish,
    CreateDishVariables
  >(CREATE_DISH, {
    refetchQueries: [
      {
        query: QUERY_RESTAURANT,
        variables: {
          input: {
            id: +id
          }
        }
      }
    ]
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState,
    setValue,
    watch,
    unregister
  } = useForm<IForm>({
    mode: "onChange"
  });

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();

    const optionObjects = optionNumber.map(theId => ({
      name: rest[`${theId}-OptionName`],
      extra: +rest[`${theId}-OptionExtra`]
    }));

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +id,
          options: optionObjects
        }
      }
    });
    history.goBack();
  };
  const [optionNumber, setOptionNumber] = useState<number[]>([]);

  const onAddOptionClick = () => {
    const uniq = Date.now();
    setOptionNumber(current => [...current, uniq]);
  };

  const onDeleteClick = (idToDelete: number) => {
    // setValue(`${idToDelete}-OptionName`, "");
    // setValue(`${idToDelete}-OptionExtra`, "");
    unregister(`${idToDelete}-OptionName`);
    unregister(`${idToDelete}-OptionExtra`);

    setOptionNumber(current => current.filter(id => id !== idToDelete));
  };

  return (
    <div className="container flex flex-col items-center">
      <Helmet>
        <title>Create Dish | Delivery Service</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3 mt-52">Create Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onChange={() => {
          console.log(watch());
          console.log(optionNumber);
        }}
      >
        <input
          {...register("name", {
            required: "Name is required"
          })}
          type="text"
          name="name"
          className="inputHandle"
          placeholder="name"
        />
        <input
          {...register("price", {
            required: "Price is required"
          })}
          type="number"
          min={0}
          name="price"
          className="inputHandle"
          placeholder="price"
        />
        <input
          {...register("description", {
            required: "Description is required"
          })}
          type="text"
          name="description"
          className="inputHandle"
          placeholder="description"
        />
        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">Dish options</h4>
          <span
            onClick={onAddOptionClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
          >
            Add dish option
          </span>
          {optionNumber.length > 0 &&
            optionNumber.map(id => (
              <div key={id} className="mt-5">
                <input
                  {...register(`${id}-OptionName`)}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2 mr-3"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-OptionExtra`)}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 py-3 px-4 ml-2 mt-5"
                  onClick={() => onDeleteClick(id)}
                  role="button"
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
