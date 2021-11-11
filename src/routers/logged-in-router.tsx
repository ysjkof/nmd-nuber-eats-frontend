import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Header } from "../component/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const CLientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      {/* <Header email={data.me.email} /> */}
      {/* 만약 깊숙히 있는 컴포넌트에 프롭스를 전달해야 한다면? 아폴로 캐시를 사용하자 */}
      <Header />
      <Switch>
        {data.me.role === "Client" && CLientRoutes}
        {/* <Redirect to="/" /> */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
