import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5  xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} className="w-44" alt="Nuber Eats" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </Link>
            {data ? data.me.email : ""}
          </span>
        </div>
      </header>
    </>
  );
};

// props를 child로 전달할때 방법.

// interface IHeaderProps {
//   email: string;
// }

// export const Header: React.FC<IHeaderProps> = ({ email }) => (
//   <header className="py-4">
//     <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
//       <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
//       <span className="text-xs">{email}</span>
//     </div>
//   </header>
// );
