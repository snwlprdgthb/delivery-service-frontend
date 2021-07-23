import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useSubscription, useMutation } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragment";
import { CookedOrderSub } from "../../__generated__/CookedOrderSub";
import { Link, useHistory } from "react-router-dom";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";

const COOKED_ORDER_SUBSRIPTION = gql`
  subscription CookedOrderSub {
    cookedOrderSub {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`

interface IDriver {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriver> = () => <div className="text-xl">🚖</div>;

interface ICurrentLocation {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [currentLocation, setCurrentLoation] = useState<ICurrentLocation>({
    lat: 0,
    lng: 0
  });

  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();

  // @ts-ignore
  const onSuccess = ({ coords: { latitude, longitude } }: Position) => {
    setCurrentLoation(current => ({ lat: latitude, lng: longitude }));
  };
  // @ts-ignore
  const onError = (position: PositionError) => {
    console.log(position);
  };

  const onGoogleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(currentLocation.lat, currentLocation.lng));
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true
    });
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(
        new google.maps.LatLng(currentLocation.lat, currentLocation.lng)
      );
      //   const geocoder = new google.maps.Geocoder();
      //   geocoder.geocode(
      //     {
      //       location: new google.maps.LatLng(
      //         currentLocation.lat,
      //         currentLocation.lng
      //       )
      //     },
      //     (results, status) => {
      //       console.log(results, status);
      //     }
      //   );
    }
  }, [currentLocation.lng, currentLocation.lat]);

  const onGetRouteClick = () => {
    if (map) {
      const directionService = new google.maps.DirectionsService();
      const directionRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#000",
          strokeOpacity: 0.5,
          strokeWeight: 5
        }
      });
      directionRenderer.setMap(map);
      directionService.route(
        {
          provideRouteAlternatives: true,
          travelMode: google.maps.TravelMode.DRIVING,
          origin: {
            location: new google.maps.LatLng(
              currentLocation.lat,
              currentLocation.lng
            )
          },
          destination: {
            location: new google.maps.LatLng(
              currentLocation.lat + 0.05,
              currentLocation.lng + 0.04
            )
          }
        },
        (results, status) => {
          console.log(results, status);
          directionRenderer.setDirections(results);
        }
      );
    }
  };

  const { data: subscriptionData } = useSubscription<CookedOrderSub>(
    COOKED_ORDER_SUBSRIPTION
  );

  const history = useHistory();
  const onCompleted = (data: takeOrder) => {
        if(data.takeOrder.ok) {
          history.push(`/orders/${subscriptionData?.cookedOrderSub.id}`)
        }
  }

  const [takeOrderMutation, {data: takeOrderData}] = useMutation<takeOrder, takeOrderVariables>(TAKE_ORDER, 
    {
      onCompleted
    });

  const takeOrderTrigger = (id: number) => {
      takeOrderMutation({
        variables: {
          input: {
            id
          }
        }
      })
  }

  useEffect(() => {
    if(subscriptionData?.cookedOrderSub.id) {
      console.log("working");
      const stringAdr = "Кривой Рог 95 квартал"
      const newstr = stringAdr.replace(/ /gi, '%20')
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: "New York"
      }, (results, status) => {
           console.log(results, status)
      })

    }
  }, [subscriptionData])

  return (
    <div>
      <div className="" style={{ width: window.innerWidth, height: "60vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA3wQWDQlt3pF6eXQG7xfZ6l_d7cwhnV4U" }}
          defaultCenter={{
            lat: currentLocation.lat,
            lng: currentLocation.lng
          }}
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onGoogleApiLoaded}
        >
          <Driver lat={currentLocation.lat} lng={currentLocation.lng} />
        </GoogleMapReact>

      </div>
      <div className="rounded-xl max-w-screen-sm mx-auto bg-white -top-10 relative shadow-lg py-8 px-5 border-2">
     { subscriptionData?.cookedOrderSub.restaurant?.name ?
      (<> 
        <h4 className="text-2xl font-medium text-center">New Order!</h4>
        <h4 className="py-3 text-xl font-medium text-center">Pick up it soon in {subscriptionData?.cookedOrderSub.restaurant?.name}</h4>
        <button onClick={() => takeOrderTrigger(subscriptionData?.cookedOrderSub.id)} className="btn w-full block text-center mt-5">Accept Order &rarr;</button>
     
      </>) : (<h1 className="font-medium text-2xl text-center">No orders yet</h1>)}
      
     </div>
    </div>
  )
};
