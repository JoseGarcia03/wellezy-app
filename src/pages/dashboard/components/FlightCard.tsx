import { LoadingButton } from "@mui/lab";
import { Box, Card, Typography } from "@mui/material";
import React from "react";

interface FlightCardProps {
    segments: Record<string, any>[];
}

const FlightCard: React.FC<FlightCardProps> = ({ segments }) => {
    return (
        <Card className="px-8 py-4 shadow-xl">
            {segments.map((segment, idx) => (
                <Box key={`${segment.flightOrtrainNumber}-${idx}`}>
                    <Box className="flex gap-5 items-center">
                        <img
                            src={`https://pics.avs.io/60/60/${segment.companyId.marketingCarrier}.png`}
                        />
                        <Typography className="inline-flex">
                            {`${Math.floor(
                                segment.productDateTime.timeDepartureSeconds /
                                    3600
                            )} horas y ${Math.floor(
                                (segment.productDateTime.timeDepartureSeconds %
                                    3600) /
                                    60
                            )} minutos`}
                        </Typography>
                    </Box>
                    <Box className="flex">
                        {segment.location.map(
                            (
                                airport: { locationName: string },
                                idx: number
                            ) => {
                                return (
                                    <>
                                        <Typography
                                            key={`${airport.locationName}-${idx}`}
                                        >
                                            {airport.locationName}
                                        </Typography>
                                        <Typography>
                                            {idx === 0 && " - "}
                                        </Typography>
                                    </>
                                );
                            }
                        )}
                    </Box>
                </Box>
            ))}
            <LoadingButton variant="contained" sx={{ mt: 3, float: "right" }}>
                Reservar
            </LoadingButton>
        </Card>
    );
};
export default FlightCard;
