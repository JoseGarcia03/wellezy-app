import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.tsx";
import { ROUTES } from "../enums/routes.ts";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "../context/AuthContext.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";
import PublicRoutes from "./PublicRoutes.tsx";
import Home from "../pages/dashboard/Home.tsx";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

const AppRouter: React.FC = () => {
    const theme = createTheme({
        typography: {
            fontFamily: "Exo, sans-serif",
            fontSize: 16,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <AuthContextProvider>
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
                        </AuthContextProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};
export default AppRouter;
