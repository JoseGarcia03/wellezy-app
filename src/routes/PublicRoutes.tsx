import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";

const PublicRoutes: React.FC = () => {
    const authContext = useContext(AuthContext);

    return authContext?.token ? <Navigate to={"/"} /> : <Outlet />
}
export default PublicRoutes;