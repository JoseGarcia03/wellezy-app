import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const PublicRoutes: React.FC = () => {
    const { isAuth } = useAppSelector((state) => state.auth);

    return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};
export default PublicRoutes;
