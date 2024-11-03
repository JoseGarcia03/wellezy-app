import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";

const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    console.log(authContext);

    return (
        <div>
            Hola {authContext?.user?.name}
        </div>
    )
}
export default Home;