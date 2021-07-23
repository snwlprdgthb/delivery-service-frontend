import React, { useEffect } from "react";
import { GetRestaurantById_getRestaurantById_restaurant_dishes_options } from "../__generated__/GetRestaurantById";

interface DishProps {
  id?: number | undefined;
  name: string;
  description: string;
  price: number;
  isCustomer?: boolean;
  options?:
    | GetRestaurantById_getRestaurantById_restaurant_dishes_options[]
    | null;
    canOrder?: boolean;
    addItemToOrder?: (dishId: number) => void;
    isSelected?: boolean;
    removeFromOrder?: (dishId: number) => void;
    children?: any
}

export const Dish: React.FC<DishProps> = ({
  id = 0,
  name,
  description,
  price,
  isCustomer = false,
  options,
  canOrder = false,
  addItemToOrder,
  isSelected,
  removeFromOrder,
  children: DishOptions
}) => {

  const onClick = () => {
    if(canOrder) {
      if(!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if(isSelected && removeFromOrder) {
       return removeFromOrder(id);
      }
    }
  }

  return (
    <div  
    className={`px-8 py-4 border  transition-all ${isSelected ? "border-gray-600" : "hover:border-gray-600" }`}>
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{description}</h4>
        <button onClick={onClick}  className={`${isSelected ? "btn bg-red-500" : "btn"}`} >{isSelected ? "Remove" : "Add"}</button>
      </div>
      <span>{price}$</span>
      {isCustomer && options && options?.length !== 0 && <div className="mt-8">
        <h5 className="font-medium my-3">Dish options:</h5>
        {DishOptions}
      </div>}
    </div>
  );
};
