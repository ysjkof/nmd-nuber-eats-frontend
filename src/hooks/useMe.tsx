import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

// useMe가 여러곳에서 호출되더라도 apollo는 캐시에 있다면 자동으로 재사용한다.
export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
