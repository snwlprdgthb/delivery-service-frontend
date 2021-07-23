import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { RESTAURANT_FRAGMENT, DISH_FRAGMENT } from "../../fragment";
import {
  GetRestaByQuery,
  GetRestaByQueryVariables
} from "../../__generated__/GetRestaByQuery";
import {
  GetRestaurantById,
  GetRestaurantByIdVariables
} from "../../__generated__/GetRestaurantById";
import { Dish } from "../../components/dish";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import { DishOption } from "../../components/dish-option";
import { CreateOrder, CreateOrderVariables } from "../../__generated__/CreateOrder";

const GET_RESTA_BY_ID = gql`
  query GetRestaurantById($input: getRestaByIdInput!) {
    getRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        dishes {
        ...DishParts
      }
      }
      
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
   mutation CreateOrder($input: CreateOrderInput!) {
     createOrder(input: $input) {
       ok
       error
       orderId
     }
   }
`

interface IRestaParam {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaParam>();

  const { data, loading } = useQuery<
    GetRestaurantById,
    GetRestaurantByIdVariables
  >(GET_RESTA_BY_ID, {
    variables: {
      input: {
        id: Number(params.id)
      }
    }
  });
  console.log(data);

  const [canOrder, setCanOrder] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const triggerOrder = () => {
    setCanOrder(true);
  }

  const getItem = (dishId: number) => {
   return orderItems.find(order => order.dishId === dishId)
  }

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  }

  const addItemToOrder = (dishId: number) => {
    if(isSelected(dishId)) {
      return;
    }
    setOrderItems(current  => [{dishId, options: []}, ...current])
  } 

  const removeFromOrder = (dishId: number) => {
    setOrderItems(current => current.filter(val => val.dishId !== dishId))
    
  }

  const addOptionToItem = (dishId:number, optionName: string) => {
    if(!isSelected(dishId)) {
      return
    }
    const oldItem = getItem(dishId);
    const hasOption = Boolean(oldItem?.options?.find((_option) => _option.name === optionName));

    if(oldItem && !hasOption) {
      removeFromOrder(dishId);
      setOrderItems((current) => ([ {dishId, options: [{name: optionName}, ...oldItem.options!]} , ...current]))
    }
  }

  const removeOptionFromItem = (dishId: number, optionToDelete: string) => {
    if(!isSelected(dishId)) {
      return
    }
    const oldItem = getItem(dishId);
    if(oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => ([
        {dishId, options: oldItem.options?.filter((option) => option.name !== optionToDelete)},
        ...current
      ]))
      return oldItem.options?.filter((option => option.name !== optionToDelete))
    }

    

 }

  console.log(orderItems);

  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find((current:any) => current.name === optionName)
  }

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if(item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  }


  const triggerCancelOrder = () => {
    setCanOrder(false);
    setOrderItems([]);
  }



  const history = useHistory();

  const onCompleted = (data: CreateOrder) => {
    const {createOrder: {ok, orderId}} = data;
    if(ok) {
      history.push(`/orders/${orderId}`)
    }
  }
  const [createOrderMutation, {loading: createLoading}] = useMutation<CreateOrder, CreateOrderVariables>(CREATE_ORDER_MUTATION,{
    onCompleted
  })

  const triggerConfirmOrder = () => {
    if(createLoading) {
      return;
    }
    if(orderItems.length === 0) {
      alert("Order is empty. Pls choose something");
      return;
    }
  
      const ok = window.confirm("Wanna get an order?")
      if(ok) {
        console.log("some");
        createOrderMutation({
          variables: {
            input: {
              restaId: Number(params.id),
              items: orderItems
            }
          }
        })
      }
    }

  return <div>
  <div className="bg-gray-500 py-48 bg-center bg-cover" style={{backgroundImage: `url(${data?.getRestaurantById.restaurant?.bgImg})`}}>
  <div className="bg-gray-300 w-8/12 md:w-6/12 py-6 pl-10 opacity-80">
      <h3 className="text-4xl font-medium mb-2">{data?.getRestaurantById.restaurant?.name}</h3>
      <h4 className="text-sm font-light">{data?.getRestaurantById.restaurant?.category?.name}</h4>
      <h5 className="text-sm font-light">{data?.getRestaurantById.restaurant?.adress}</h5>
  </div>
  </div>
  <div className="container flex flex-col items-end mt-10">

  {!canOrder &&   <button onClick={triggerOrder} className="btn mr-6">Start Order</button> }

   {canOrder && (
     <div className="flex items center">
  <button onClick={triggerConfirmOrder} className="btn mr-6">Confirm Order</button>
  <button onClick={triggerCancelOrder} className="btn bg-black mr-6 hover:bg-black">Cancel Order</button>
  </div>
   )}

  <div className="w-full grid pb-32 mt-16 grid-cols-3 gap-x-5 gap-y-10">
  {data?.getRestaurantById?.restaurant?.dishes.map((value,index) => (
              <Dish 
              // addOptionToItem={addOptionToItem} 
              removeFromOrder={removeFromOrder} 
              isSelected={isSelected(value.id)} 
              id={value.id} 
              addItemToOrder={addItemToOrder} 
              canOrder={canOrder} 
              key={index} 
              name={value.name} 
              description={value.description} 
              price={value.price} 
              isCustomer={true} 
              options={value.options}> 
                                  {value.options?.map((currentOption, index) => (
      <DishOption 
      key={index}
      addOptionToItem={addOptionToItem}
      removeOptionFromItem={removeOptionFromItem}
      isSelected={isOptionSelected(value.id, currentOption.name)}
      id={value.id}
      name={currentOption.name}
      extra={currentOption.extra}/>

                                   ))}
              </Dish>
            ))}
  </div>
          
  </div>
  </div>;
};
