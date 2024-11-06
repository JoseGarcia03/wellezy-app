import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import FlightCard from "./FlightCard";

const Flights: React.FC = () => {
    const { flights } = useAppSelector((state) => state.flight);

    return (
        flights && (
            <Container maxWidth={"xl"} className="flex flex-col gap-4 mt-5">
                <Box className="flex items-center w-full gap-10">
                    <Typography>
                        Desde ${" "}
                        {flights.priceMin.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        COP
                    </Typography>
                    <Box className="flex gap-5 items-center">
                        {flights.companies.map((company) => (
                            <img
                                src={`https://pics.avs.io/60/60/${company}.png`}
                            />
                        ))}
                    </Box>
                </Box>
                {flights?.Seg1?.map((flight) => {
                    return (
                        <div key={flight.num}>
                            <FlightCard segments={flight.segments} />
                        </div>
                    );
                })}
            </Container>
        )
    );
};
export default Flights;
