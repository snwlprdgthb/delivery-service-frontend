import React from "react";
import logo from "../images/form-logo.svg";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <>
      {!data?.me.emailVerify && (<div className="bg-red-500 py-3 px-3 text-center text-white"><span>Please verify your email</span></div>)}
      <header className="py-2">
        <div className="container  xl:px-0 flex justify-between items-center">
        <Link to="/">
        <img src={logo} className="w-64" />
        </Link>  
          <span className="text-xs  mt-4 mr-4">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faHammer} className="text-2xl xl:text-3xl text-blue-500" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};

// max - w - xl;
// mx - auto;
