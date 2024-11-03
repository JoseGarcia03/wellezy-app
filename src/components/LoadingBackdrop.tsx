import React from "react";
import {Backdrop} from "@mui/material";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const LoadingBackdrop: React.FC = () => {
    return (
        <Backdrop open={true}>
            <DotLottieReact className={"w-72"} src={"src/assets/backdrop_animation.json"} autoplay loop />
        </Backdrop>
    )
}
export default LoadingBackdrop;