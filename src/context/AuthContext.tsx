import React, {createContext, ReactNode, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoadingBackdrop from "../components/LoadingBackdrop.tsx";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

interface UserProps {
    id: string;
    name: string;
    email: string;
    last_name: string;
}

interface AuthContextType {
    user: UserProps|null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    setUserData: (userData: UserProps) => void;
}
const AuthContext = createContext<AuthContextType|undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContextProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProps|null>(null);
    const navigate = useNavigate();

    const mutate = useMutation({
        mutationFn: async() => await axios.get(
            `${import.meta.env.VITE_API_URL}/users/get-user`,
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} }
        ),
        onSuccess: (response) => {
            setUser(response?.data?.data);
        },
        onError: () => {
            logout();
        }
    })

    useEffect(() => {
        const authToken = localStorage.getItem("token");
        if (authToken) {
            setToken(authToken);
            mutate.mutate();
        } else {
            navigate("/login");
        }
        setTimeout(() => setLoading(false), 3000);
    }, [navigate]);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const setUserData = (userData: UserProps) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, setUserData }}>
            {loading ? <LoadingBackdrop /> : children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider};