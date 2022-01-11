import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
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
  // 쿼리는 보통 즉시 실행된다. 레이지쿼리는 다른 이벤트에 대한 응답으로 쿼리를 실행할 때 사용할 수 있다.
  // 레이지쿼리가 반환하는 튜플의 첫 번째 항목은 쿼리 함수(이하 callQuery)다.
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
