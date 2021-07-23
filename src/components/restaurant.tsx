import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  bgImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  bgImg,
  name,
  categoryName,
  id
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex flex-col border ">
        <div
          className="py-28 bg-cover bg-center mb-3"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
        <h3 className="text-lg pl-3 font-medium">{name}</h3>
        <span className="mt-2 py-3 pl-3 border-t border-gray-300 text-xs opacity-50">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
