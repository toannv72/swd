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
import OrderRequest from "./Page/Authenticator/Order_Request/Order"; 
import Logout from "./Page/Authenticator/Logout/Logout"; 
import TableOrder from "./Page/admin/TableOrder"; 
import Invoice from "./Page/Authenticator/Payment/Invoice";

import Required from "./Page/Authenticator/Required/Required"
import TableUser from "./Page/Admin2/TableUser";
import Dashboard from "./Page/manager/dashboard";
 

import ShowAll from "./Page/Authenticator/ShowAll/ShowAll";
import TableOrderRequest from "./Page/admin/TableOrderRequest";
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
    path: "/required", 
    element: <Required />
  },
  { 
    path: "/staff/product/create",
    element: <CreateProduct />, 
  }, 
  {
    path: "/staff/product/table", 
    element: <TableProduct />, 
  }, 
  { 
    path: "/payment", 
    element: <PaymentPage />, 
  },
  {
    path: "/order",
    element: <Order />,
  }, 
  {
    path: "/orderRequest",
    element: <OrderRequest />, 
  }, 
  {
    path: "/staff/order",
    element: <TableOrder />,
  }, 
  {
    path: "/staff/orderRequest",
    element: <TableOrderRequest />
  }, 
  {
    path: "/payment/bill/:id",
    element: <Invoice />,
  },
  {
    path: "/admin/tableUser",
    element: <TableUser />,
  },
  {
    path: "/manager/dashboard",
    element: <Dashboard />,
  },
  { 
    path: "/showAll", 
    element: <ShowAll/>, 
  }, 
]); 
