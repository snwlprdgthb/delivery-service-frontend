import React, { useEffect } from "react";
import { useParams } from "react-router";
import { gql, useQuery, useSubscription, useMutation } from "@apollo/client";
import { GetOrder, GetOrderVariables } from "../../__generated__/GetOrder";
import { Helmet } from "react-helmet";
import { FULL_ORDER_FRAGMENT } from "../../fragment";
import { UpdateOrder, UpdateOrderVariables } from "../../__generated__/UpdateOrder";
import { useMe } from "../../hooks/useMe";
import { EditOrder, EditOrderVariables } from "../../__generated__/EditOrder";
import { odrerStatus, UserRole } from "../../__generated__/globalTypes";


interface IParams {
  id: string;
}

const GET_ORDER_QUERY = gql`
  query GetOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      Order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

const MUTATION_EDIT_ORDER = gql`
mutation EditOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
        ok
        error
    }
}   
`

const SUBSRIPTION_ORDER_UPDATE = gql`
  subscription UpdateOrder($input: UpdateOrderInput!) {
      updateOrder(input: $input) {
         ...FullOrderParts
      }
  }
  ${FULL_ORDER_FRAGMENT}
`

export const Order = () => {
    const {data: userData } = useMe();
  const params = useParams<IParams>();

  const { data, subscribeToMore } = useQuery<GetOrder, GetOrderVariables>(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: +params.id
      }
    }
  });

  const [editOrderMutation, {data: editOrderData}] = useMutation<EditOrder, EditOrderVariables>(MUTATION_EDIT_ORDER)

  const onChangeStatus = (newStatus: odrerStatus) => {
    editOrderMutation({
        variables: {
            input: {
                id: +params.id,
                status: newStatus
            }
        }
    })
}
//   const { data: subscriptionData} = useSubscription<UpdateOrder, UpdateOrderVariables>(SUBSRIPTION_ORDER_UPDATE, {
//       variables: {
//           input: {
//               id: +params.id
//           }
//       }
//   })

  useEffect(() => {
      if(data?.getOrder.ok) {
          subscribeToMore({
             document: SUBSRIPTION_ORDER_UPDATE,
             variables: {
                 input : {
                     id: +params.id
                 }
             },
             updateQuery: (prev, {subscriptionData: {data}}: {subscriptionData:{data: UpdateOrder}}) => {
                 if(!data) return prev;
                 return {
                     getOrder: {
                         ...prev.getOrder,
                         order: {
                             ...data.updateOrder
                         }
                     }
                 }
             }
          })
      }
  }, [data])

  //console.log(subscriptionData);
  return (
    <div className="mt-32 container flex justify-center">
    <Helmet>
        <title>Order #{params.id } | Delivery Service</title>
    </Helmet>
      <div className="border border-gray-800  max-w-sreen-sm w-full flex flex-col justify-center">
      <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{params.id}
      </h4>
      <h5 className="p-5 text-xl text-center">
          ${data?.getOrder.Order?.total}
      </h5>
      <div className="p-5 text-xl grid gap-6"> 
             <div className="border-t pt-5 border-gray-700">
               Prepared By:{" "}
               <span className="font-medium">
                   {data?.getOrder.Order?.restaurant?.name}
               </span>
             </div>
             <div className="border-t pt-5 border-gray-700">
                Deliver To:{" "}
                <span className="font-medium">
                    {data?.getOrder.Order?.customer?.email}
                </span>
             </div>
             <div className="border-t border-b py-5 border-gray-700">
                Driver: {" "}
                <span className="font-medium">
                  {data?.getOrder.Order?.driver?.email || "Not yet"}
                </span>
             </div>
            {userData?.me.role === UserRole.Client &&  <span className="text-center mt-5 mb-3 text-2xl text-lime-600">
                 Status: {data?.getOrder.Order?.status}
             </span>}
             {userData?.me.role === UserRole.Owner && (
             <>
                {data?.getOrder.Order?.status === odrerStatus.Pending &&  <button onClick={() => {onChangeStatus(odrerStatus.Cooking)}} className="btn">Accept order</button>}
                {data?.getOrder.Order?.status === odrerStatus.Cooking &&  <button onClick={() => {onChangeStatus(odrerStatus.Cooked)}} className="btn">Order cooked</button>}
                {data?.getOrder.Order?.status !== odrerStatus.Pending &&
                data?.getOrder.Order?.status !== odrerStatus.Cooking && (
                  <span className="text-center mt-5 mb-3 text-2xl text-lime-600">
                    Status: {data?.getOrder.Order?.status}
                  </span>)}
             </>
             )}
 
            {userData?.me.role === UserRole.Delivery && (
             <>
                {data?.getOrder.Order?.status === odrerStatus.Cooked &&  <button onClick={() => {onChangeStatus(odrerStatus.PickedUp)}} className="btn">Picked Up</button>}
                {data?.getOrder.Order?.status === odrerStatus.PickedUp &&  <button onClick={() => {onChangeStatus(odrerStatus.Delivered)}} className="btn">Delivered</button>}
             </>
             )}
             {data?.getOrder.Order?.status === odrerStatus.Delivered && (
                  <span className="text-center mt-5 mb-3 text-2xl text-lime-600">
                    Thanks for using our Service :)
                  </span>)}
         
      </div>
      </div>
    </div>
  );
};
