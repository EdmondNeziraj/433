import React from "react";
import { Navigate } from "react-router-dom";
import Homepage from "../components/Homepage";
import Matchespage from "../components/Matchespage";
import Hostpage from "../components/Hostpage";


const userRoutes = [
    // Index
    { path: "/", component: Homepage },
    { path: "/home", component: Homepage },

    // Footer
    { path: "/matches", component: Matchespage },
    { path: "/host", component: Hostpage },

    { path: "/", exact: true, component: () => <Navigate  to="/" /> }, 

]

export {userRoutes}