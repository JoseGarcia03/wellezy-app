import React, {useContext, useState} from "react";
import {
    Alert,
    Box,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput, Snackbar, TextField,
    Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import useForm from "../../hooks/useForm.ts";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.tsx";
import LoadingBackdrop from "../../components/LoadingBackdrop.tsx";

type FormData = {
    email: string;
    password: string;
}
const Login: React.FC = () => {
    const authContext = useContext(AuthContext);

    const [showNotify, setShowNotify] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword,setShowPassword] = useState(false);
    const { values, handleChange } = useForm<FormData>({ email: "", password: ""});

    const mutation = useMutation({
        mutationFn: async () => await axios.post(`${import.meta.env.VITE_API_URL}/login`, values),
        onSuccess: ({ data }) => {
            authContext?.setUserData(data.data.user);
            authContext?.login(data.data.token);
        },
        onError: (error) => {
            // @ts-ignore
            setErrorMessage(error?.response?.data?.message);
            setShowNotify(true);
        }
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate();
    }

    if (!authContext) return <LoadingBackdrop />;

    return (
        <div className={"flex items-center"}>
            <div className={"w-3/5"}>
                <Typography variant={"h1"} sx={{ fontSize: 24, fontWeight: 500, textAlign: "center", marginBottom: 3 }}>Bienvenido a Wellezy!</Typography>
                <Box component={"form"} onSubmit={handleSubmit} autoComplete={"off"} className={"mx-auto max-w-sm"}>
                    <FormControl fullWidth sx={{ marginBottom: 3 }}>
                        <FormLabel htmlFor={"email"}>Correo Electronico</FormLabel>
                        <TextField
                            id={"email"}
                            name={"email"}
                            type={"email"}
                            size={"small"}
                            value={values.email}
                            sx={{ ariaLabel: "email" }}
                            placeholder={"example@example.com"}
                            onChange={handleChange}
                            variant={"outlined"}
                            helperText={""}
                            fullWidth
                            autoFocus
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 3 }}>
                        <FormLabel htmlFor={"password"}>Contraseña</FormLabel>
                        <OutlinedInput
                            id={"password"}
                            name={"password"}
                            type={ showPassword ? "text" : "password"}
                            size={"small"}
                            value={values.password}
                            autoComplete={"current-password"}
                            onChange={handleChange}
                            required
                            fullWidth
                            endAdornment={
                                <InputAdornment position={"end"}>
                                    <IconButton
                                        aria-label={ showPassword ? "hide the password" : "diplay the password" }
                                        edge={"end"}
                                        onClick={handleClickShowPassword}
                                    >
                                        { showPassword ? <IoMdEyeOff /> : <IoMdEye /> }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <LoadingButton
                        loading={mutation.isPending}
                        type={"submit"}
                        variant={"contained"}
                        className={"!mb-2"}
                        fullWidth
                    >
                        Iniciar Sesion
                    </LoadingButton>
                    <Typography>
                        ¿Aun no tienes cuenta?
                        <Link className={"text-blue-600"} to={"/register"}> Registrate</Link>
                    </Typography>
                </Box>
            </div>
            <div className={"bg-primary h-screen w-2/5 flex justify-center items-center overflow-hidden"}>
                <DotLottieReact src={"src/assets/airplane_animation.json"} className={"max-w-full scale-150"} loop autoplay />
            </div>
            <Snackbar
                open={showNotify}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setShowNotify(false)}
            >
                <Alert severity={"error"}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default Login;