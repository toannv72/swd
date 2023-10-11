import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Page/Authenticator/Login/Login";
import Home from "./Page/Authenticator/Home/Home";
import Product from "./Page/Authenticator/Product/Product";
import PageNotFound from "./Page/Authenticator/404/PageNotFound";
import Reissue from "./Page/Authenticator/Reissue/Reissue";
import PaymentPage from "./Page/Authenticator/Payment/Payment"; 
import TableProduct from "./Page/admin/TableProduct";
import CreateProduct from "./Page/admin/CreateProduct";
import Order from "./Page/Authenticator/Order/Order"; 
import Logout from "./Page/Authenticator/Logout/Logout"; 
import TableOrder from "./Page/admin/TableOrder"; 
import Invoice from "./Page/Authenticator/Payment/Invoice"; 

export const routers = createBrowserRouter([ 
  { 
    path: "*", 
    element: <PageNotFound />, 
  }, 
  { 
    path: "/",
    element: <Home />, 
  }, 
  { 
    path: "/login", 
    element: <Login />, 
  }, 
  { 
    path: "/logout", 
    element: <Logout />, 
  }, 
  {  
    path: "/reissue", 
    element: <Reissue />, 
  }, 
  { 
    path: "/product/:slug", 
    element: <Product />, 
  }, 
  { 
    path: "/admin/product/create",
    element: <CreateProduct />, 
  }, 
  {
    path: "/admin/product/table", 
    element: <TableProduct />, 
  }, 
  { 
    path: "/payment", 
    element: <PaymentPage />, 
  },{
    path: "/order",
    element: <Order />,
  }, 
  {
    path: "/admin/order",
    element: <TableOrder />,
  },
  {
    path: "/bill/:id",
    element: <Order />,
  },
  { 
    path: "/invoice",
    element: <Invoice />, 
  }, 
]); 
