import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => (
  <div>
    <h1>Logged Out</h1>
    <button onClick={() => isLoggedInVar(true)}>Click to Login</button>
  </div>
);
