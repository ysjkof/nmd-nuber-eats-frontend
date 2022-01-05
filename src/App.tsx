import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";

// 이렇게하면 서버에 요청하게 된다.
// const IS_LOGGED_IN = gql`
//   {
//     isLoggedIn
//   }
// `;

// @client를 하면 클라이언트에게 요청하게 된다. 나머지는 위에 부분과 동일한 의미다.
// apollo.ts의 typePolicies에 isLoggedIn을 요청하는 거다.
// reactive-variables를 쓰면 필요 없다
// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `;

function App() {
  // const {
  //   data: { isLoggedIn },
  // } = useQuery(IS_LOGGED_IN);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
