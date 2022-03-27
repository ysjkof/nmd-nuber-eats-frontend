import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );

  return (
    <div>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || "Loading..."} | Nuber Eats
        </title>
      </Helmet>
      <div
        className="  bg-gray-700  bg-cover bg-center py-28"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="mb-10 text-4xl font-medium">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className=" mr-8 bg-gray-800 py-3 px-10 text-white"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className=" bg-lime-700 py-3 px-10 text-white">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="mb-5 text-xl">Please upload a dish!</h4>
          ) : null}
        </div>
      </div>
    </div>
  );
};