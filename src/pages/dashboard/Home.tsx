import React, { useState } from "react";
import Navbar from "../../components/Navbar.tsx";
import Search from "./components/Search.tsx";
import { Alert, Snackbar } from "@mui/material";
import Flights from "./components/Flights.tsx";

const Home: React.FC = () => {
    const [showNotify, setShowNotify] = useState(false);

    return (
        <React.Fragment>
            <Navbar />
            <Search setShowNotify={setShowNotify} />
            <Flights />

            <Snackbar
                open={showNotify}
                onClose={() => setShowNotify(false)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity="error"> Debe completar todos los campos</Alert>
            </Snackbar>
        </React.Fragment>
    );
};
export default Home;
