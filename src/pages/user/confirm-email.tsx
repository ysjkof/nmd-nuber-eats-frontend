import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useMe } from "../../hooks/useMe";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      // Reading and Writing Data to the cache guide: writeFragment
      // Fragment는 전체 DB에서 수정하고 싶은 일부분이다.
      client.writeFragment({
        // 캐시에서 User:1 이런식으로 돼 있기 때문에 아래처럼.
        id: `User:${userData?.me.id}`,
        // 이하 cache로 보내서 업데이트 됐으면 하는 프래그먼트로. 무엇을 바꾸고 싶은지 선언
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        // 그 data를 보냄.
        data: {
          verified: true,
        },
      });
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );
  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
