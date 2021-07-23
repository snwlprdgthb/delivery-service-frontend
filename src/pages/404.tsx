import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | Delivery Service</title>
    </Helmet>
    <h2 className="font-semibold text-xl mb-4">Page not Found.</h2>
    <h4 className="font-medium text-base mb-5">
      Page probably doesn't not exist.
    </h4>
    <Link className="hover:underline text-lime-500" to="/">
      Go Back &rarr;
    </Link>
  </div>
);
