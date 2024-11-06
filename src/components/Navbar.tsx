import React from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { PiAirplaneInFlight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { logout } from "../store/slices/auth.slice";

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    return (
        <AppBar position="static" className={"!bg-navbar mb-5"}>
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <PiAirplaneInFlight size={70} className={"mr-2"} />
                    <Link to={"/"} className={"text-3xl whitespace-nowrap"}>
                        Wellezy
                    </Link>
                    <Box sx={{ flexGrow: 1, display: "flex", ml: 5 }}>
                        <Button sx={{ color: "white" }}>Inicio</Button>
                        <Button sx={{ color: "white" }}>Reservaciones</Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            sx={{ p: 0 }}
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                                setAnchorElUser(event.currentTarget)
                            }
                        >
                            <Avatar />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            sx={{ mt: "45px" }}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                            keepMounted
                        >
                            <MenuItem onClick={() => dispatch(logout())}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Cerrar Sesion
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
