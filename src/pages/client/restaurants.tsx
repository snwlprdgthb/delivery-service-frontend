import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  restaQuery,
  restaQueryVariables
} from "../../__generated__/restaQuery";
import { url } from "inspector";
import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const RESTAURANT_QUERY = gql`
  query restaQuery($input: RestaurantsInput!) {
    getAllCategories {
      ok
      error
      categories {
        id
        name
        slug
        bgImg
        restaCount
      }
    }
    restaurantsPagination(input: $input) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        id
        name
        bgImg
        category {
          name
        }
        adress
        isPromoted
      }
    }
  }
`;

interface IFormSearchProps {
    search: string;
}

export const Restaurants = () => {
const[page,setPage] = useState(1);

  const { data, loading } = useQuery<restaQuery, restaQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          page
        }
      }
    }
  );

  const {handleSubmit, register, getValues} = useForm<IFormSearchProps>();

   const onNextPage = () => setPage((current) => current+1);
   const inPrevPage = () => setPage((current) => current-1);
   const history = useHistory();
   const onSubmit = () => {
       const {search} = getValues()
       history.push({
           pathname: "/search",
           search: `?term=${search}`
       })
   }

  return (
    <div>
        <Helmet>
            <title>Home | Delivery Service</title>
        </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 flex justify-center items-center py-40 w-full border border-lime-900">
        <input
        {...register("search", {required: true})}
          name="search"
          type="search"
          className="inputHandle rounded-md border-0 w-3/4 md:w-3/12"
          placeholder="Search resta"
        />
      </form>
      {!loading && (
         <div className="max-w-screen-lg mx-auto mt-3 border border-lime-100">
            <div className="flex justify-around max-w-sm mx-auto">
            {data?.getAllCategories.categories?.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`}>
                <div  className="flex flex-col group items-center cursor-pointer">
                  <div className="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full" style={{backgroundImage: `url(${cat.bgImg})`}} key={cat.id}>
                  </div>
                  <span className="text-xs font-medium mt-1">{cat.name} </span>
              </div>
              </Link>
        ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-x-3 gap-y-8 mt-10 pb-3">
            {data?.restaurantsPagination.restaurants?.map(resta => (
               <Restaurant key={resta.id} id={resta.id + ""} bgImg={resta.bgImg} name={resta.name} categoryName={resta.category?.name}/>
            ))}</div>
            <div className=" grid grid-cols-3 text-center max-w-xs items-center mx-auto mb-8 mt-3">
                {page > 1 ? (<button className="font-medium text-2xl" onClick={inPrevPage}>&larr;</button>): <div />}
                <span>Page {page} of {data?.restaurantsPagination.totalPages}</span>
                {page !== data?.restaurantsPagination.totalPages ? (
                <button onClick={onNextPage} className="font-medium text-2xl">&rarr;</button>) : <div/>}
            </div>
         </div>
         )}
    </div>
  );
};
