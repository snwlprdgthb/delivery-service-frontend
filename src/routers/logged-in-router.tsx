import React from "react";
import { isLoggedInVar } from "../apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { Search } from "../pages/client/search";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { _MyRestaurants } from "../pages/owner/my-restaurants";
import { CreateNewRestaurant } from "../pages/owner/create-restaurant";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { AddDish } from "../pages/owner/create-dish";
import { Order } from "../pages/user/order";
import { Dashboard } from "../pages/driver/dashboard";

const REGEX = "([A-za-z0-9])";
const CONFIRM_PATH = `/confirm${REGEX}`;

// const ClientRoutes = [
//   <Route key="1" path="/" exact>
//     <Restaurants />
//   </Route>,
//   <Route key="2" path="/confirm" exact>
//     <ConfirmEmail />
//   </Route>,
//   <Route key="3" path="/edit-profile">
//     <EditProfile />
//   </Route>,
//   <Route key="4" path="/search">
//     <Search />
//   </Route>,
//   <Route key="5" path="/category/:slug">
//     <Category />
//   </Route>,
//   <Route key="6" path="/restaurant/:id">
//     <Restaurant />
//   </Route>
// ];

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />
  },
  {
    path: "/search",
    component: <Search />
  },
  {
    path: "/category/:slug",
    component: <Category />
  },
  {
    path: "/restaurant/:id",
    component: <Restaurant />
  }
];

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/orders/:id", component: <Order /> }
];

const restaRoutes = [
  { path: "/", component: <_MyRestaurants /> },
  { path: "/create-restaurant", component: <CreateNewRestaurant /> },
  { path: "/restaurant/:id", component: <MyRestaurant /> },
  { path: "/restaurant/:id/create-dish", component: <AddDish /> }
];

const driverRoutes = [{ path: "/", component: <Dashboard /> }];

// const QUERY_ME = gql`
//   query me_query {
//     me {
//       id
//       email
//       role
//       emailVerify
//     }
//   }
// `;
//use useMe() custom hook instead this

export const LoggedInRouter = () => {
  // const { data, loading, error } = useQuery<me_query>(QUERY_ME);
  const { data, loading, error } = useMe();
  console.log(error);
  console.log(data);

  if (!data || error || loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl">Loading</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" &&
          clientRoutes.map((route, index) => (
            <Route exact key={index} path={route.path}>
              {route.component}
            </Route>
          ))}

        {data.me.role === "Owner" &&
          restaRoutes.map((route, index) => (
            <Route exact key={index} path={route.path}>
              {route.component}
            </Route>
          ))}

        {commonRoutes.map((route, index) => (
          <Route key={index} path={route.path}>
            {route.component}
          </Route>
        ))}

        {driverRoutes.map((route, index) => (
          <Route key={index} path={route.path}>
            {route.component}
          </Route>
        ))}

        <Route>
          <NotFound />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
};
