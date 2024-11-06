import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux.ts";

const PrivateRoutes: React.FC = () => {
    const { isAuth } = useAppSelector((state) => state.auth);

    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
