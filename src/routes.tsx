
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Page/Authenticator/Login/Login";




export const routers = createBrowserRouter(
    [

        {
            path: "*",
            element: "404"
        },
        {
            path: "/",
            element: <Login/>
        },
    


    ]
)