import React from "react";
import Navbar from "../../components/Navbar.tsx";
import Search from "./components/Search.tsx";

const Home: React.FC = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Search />
        </React.Fragment>
    )
}
export default Home;