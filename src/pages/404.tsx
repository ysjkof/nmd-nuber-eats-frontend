import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | Nuber Eats</title>
    </Helmet>
    <h2 className="mb-3 text-2xl font-semibold">Page Not Found.</h2>
    <h4 className="mb-5 text-base font-medium">
      The page you're looking for does not exist or has moved.
    </h4>
    <Link className="text-lime-600 hover:underline" to="/">
      Go Back home
    </Link>
  </div>
);
