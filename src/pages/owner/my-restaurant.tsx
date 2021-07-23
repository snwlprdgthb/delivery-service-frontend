import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { RESTAURANT_FRAGMENT, DISH_FRAGMENT, ORDER_FRAGMENT, FULL_ORDER_FRAGMENT } from "../../fragment";
import {
  myRestaurant,
  myRestaurantVariables
} from "../../__generated__/myRestaurant";
import { Link } from "react-router-dom";
import { Dish } from "../../components/dish";
import {VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryVoronoiContainer, VictoryLine, VictoryTheme, VictoryLabel} from "victory"
import { toArray } from "optimism/lib/helpers";
import { orderSubscr } from "../../__generated__/orderSubscr";

interface IParams {
  id: string;
}

const chartData = [
  {x: 1, y:3000 },
  {x: 2, y: 2600},
  {x: 3 , y: 4300},
  {x: 4, y: 1800},
  {x: 5, y: 2500},
  {x: 6, y: 3900},
  {x: 7, y: 2500},
]

export const QUERY_RESTAURANT = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        dishes {
            ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDER_FRAGMENT}
`;

const SUBSCRIPTION_ORDER_PENDING = gql`
subscription orderSubscr {
  orderSubscr {
     ...FullOrderParts
  }
}
${FULL_ORDER_FRAGMENT}
`

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const {data: subscriptionData} = useSubscription<orderSubscr>(SUBSCRIPTION_ORDER_PENDING)

  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    QUERY_RESTAURANT,
    {
      variables: {
        input: {
          id: Number(id)
        }
      }
    }
  );
  const history = useHistory();
  useEffect(() => {
    if(subscriptionData?.orderSubscr.id) {
  history.push(`/orders/${subscriptionData?.orderSubscr.id}`)
  }}, [subscriptionData])

 console.log(data);
  return <div>
      <div className="bg-gray-700 py-28 bg-center bg-cover"
      style={{backgroundImage: `url(${data?.myRestaurant?.restaurant?.bgImg})`}}
      >
      </div>
      <div className="container mt-10">
     <h2 className="text-4xl font-medium mb-10">
         {data?.myRestaurant?.restaurant?.name || "Loading"}
     </h2>
     <Link to={`/restaurant/${id}/create-dish`} className="mr-8 text-white bg-gray-800 py-3 px-8">
     Add Dish &rarr;
     </Link>
     <Link to={``} className="text-white bg-lime-700 py-3 px-10">
     Buy Promotion &rarr;
     </Link>
     <div>
          {data?.myRestaurant?.restaurant?.dishes.length === 0 ? <h4 className="mt-5 text-xl">Please upload a dish</h4> : 
          <div className="grid mt-16 grid-cols-3 gap-x-5 gap-y-10">
            {data?.myRestaurant?.restaurant?.dishes.map((value,index) => (
              <Dish key={index} name={value.name} description={value.description} price={value.price}/>
            ))}
          </div>
        }
      </div>
    <div className="text-center border-2 mt-20">
       <h4 className="text-2xl mb-3 font-medium">Sales</h4>
       <div className=" max-w-7xl w-full mx-auto border-2">   
        {/* max-w-md w-full mx-auto */}
       {/* <VictoryChart domainPadding={20}>
       <VictoryAxis tickFormat={(step) => `$ ${step/1000}K`} dependentAxis />
       <VictoryAxis tickFormat={(step) => `Day ${step}`} />
            <VictoryBar data={chartData} />
       </VictoryChart> */}
    {/* width={window.innerWidth} */}
        <VictoryChart theme={VictoryTheme.material} domainPadding={5} height={200}  containerComponent={<VictoryVoronoiContainer />}>
          <VictoryLine 
            data={data?.myRestaurant?.restaurant?.orders.map(order => ({x: order.createdAt , y: order.total }))}
            interpolation="monotoneY"
            style={{
              data: {
                stroke: "blue",
                strokeWidth: 1
              }
            }}
          />
           <VictoryAxis 
           style={{ tickLabels: {fontSize: 5, fill: "#4D7C0F"}}}
           dependentAxis tickFormat={(price) => `$${price}`} />
          <VictoryAxis style={{tickLabels: {fontSize: 5}}} tickFormat={(tick) => new Date(tick).toLocaleDateString()} />
        </VictoryChart>
      
       
       </div>
    </div>
     
      </div>
  </div>;
};
 