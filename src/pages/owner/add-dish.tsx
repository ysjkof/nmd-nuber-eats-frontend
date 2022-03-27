import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;
interface IForm {
  name: string;
  price: string;
  description: string;
}

interface IParams {
  restaurantId: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { name, price, description } = getValues();
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className="container mt-52 flex flex-col items-center">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-semibold">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3"
      >
        <input
          {...register("name", { required: "Name is required.", minLength: 5 })}
          className="input"
          type="text"
          name="name"
          min={5}
          placeholder="Name"
        />
        <input
          {...register("price", { required: "Price is required." })}
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
        />
        <input
          {...register("description", { required: "Description is required." })}
          className="input"
          type="text"
          name="description"
          placeholder="Description"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
