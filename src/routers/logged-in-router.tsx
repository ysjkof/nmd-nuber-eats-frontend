import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => (
  <div>
    <h1>Logged In</h1>
    <button onClick={() => isLoggedInVar(false)}>Click to Logout</button>
  </div>
);
