import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";

const PrivateRoutes: React.FC = () => {
    const authContext = useContext(AuthContext);

    return authContext?.token ? <Outlet /> : <Navigate to={"/login"} />;
}
export default PrivateRoutes;