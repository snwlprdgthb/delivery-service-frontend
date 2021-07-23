import React, { useState, useEffect } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import { MyRestaurants } from "../../__generated__/MyRestaurants";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";

export const MY_RESTA_QUERY = gql`
  query MyRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const _MyRestaurants = () => {
  const { data, loading, error } = useQuery<MyRestaurants>(MY_RESTA_QUERY);



  const[page,setPage] = useState(1);
  const onNextPage = () => setPage((current) => current+1);
  const inPrevPage = () => setPage((current) => current-1);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Delivery Service</title>
      </Helmet>
      <div className="mt-24 container">
      <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
      {data?.myRestaurants.ok &&
        data?.myRestaurants?.restaurants?.length === 0 ?
        (<>
        <h4>You have no restaurant</h4>
        <Link className="link" to="/create-restaurant" >
        Create one &arr;
        </Link>
        </>) : <div>
        <div className="grid sm:grid-cols-3 gap-x-3 gap-y-8 mt-10 pb-3">
            {data?.myRestaurants?.restaurants?.map(resta => (
               <Restaurant key={resta.id} id={resta.id + ""} bgImg={resta.bgImg} name={resta.name} categoryName={resta.category?.name}/>
            ))}</div>
            {/* <div className=" grid grid-cols-3 text-center max-w-xs items-center mx-auto border  border-black-200 mt-3">
                {page > 1 ? (<button className="font-medium text-2xl" onClick={inPrevPage}>&larr;</button>): <div />}
                <span>Page {page} of {data?.restaurantsPagination.totalPages}</span>
                {page !== data?.restaurantsPagination.totalPages ? (
                <button onClick={onNextPage} className="font-medium text-2xl">&rarr;</button>) : <div/>
                 }
            </div> */}
        </div>}
      {/* {data.myRestaurants.ok && data?.myRestaurants?.map((resta,index) => {
          <div className="w-3/12">
              <h1>{resta.name}</h1>
          </div>
      })} */}
  </div>
    </div>
  );
};
