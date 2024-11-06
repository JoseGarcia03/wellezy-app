import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.tsx";
import { ROUTES } from "../enums/routes.ts";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoutes from "./PrivateRoutes.tsx";
import PublicRoutes from "./PublicRoutes.tsx";
import Home from "../pages/dashboard/Home.tsx";
import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { thunkLoginAction } from "../store/actions/auth.actions.ts";
import LoadingBackdrop from "../components/LoadingBackdrop.tsx";
import { setLoading } from "../store/slices/layout.slice.ts";

const queryClient = new QueryClient();

const AppRouter: React.FC = () => {
    const theme = createTheme({
        typography: {
            fontFamily: "Exo, sans-serif",
            fontSize: 16,
        },
    });

    const { isLoading } = useAppSelector((state) => state.layout);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(isLoading);
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(thunkLoginAction(token));
        }
        setTimeout(() => dispatch(setLoading(false)), 2000);
    }, []);

    if (isLoading) return <LoadingBackdrop />;

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<PublicRoutes />}>
                                <Route
                                    path={ROUTES.LOGIN}
                                    element={<Login />}
                                />
                                <Route path={ROUTES.REGISTER} />
                            </Route>

                            <Route element={<PrivateRoutes />}>
                                <Route path={"/"} element={<Home />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};
export default AppRouter;
