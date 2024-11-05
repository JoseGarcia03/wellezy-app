import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Container,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { GiCommercialAirplane } from "react-icons/gi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Item, parseDataToOrigin } from "../helpers/parseDataToSelect.ts";
import { AiOutlineLoading } from "react-icons/ai";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LoadingButton } from "@mui/lab";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const Search: React.FC = () => {
    const [origin, setOrigin] = useState<string>("");
    const [origins, setOrigins] = useState<Item[]>([]);
    const [destination, setDestination] = useState<string>("");
    const [destinations, setDestinations] = useState<Item[]>([]);
    const [flightType, setFlightType] = useState<string>("oneway");

    const getOrigins = useMutation({
        mutationFn: async (code: string) =>
            await axios.post(`${import.meta.env.VITE_API_TRAVEL}/airports/v2`, {
                code,
            }),
        onSuccess: (resp) => {
            const origins = parseDataToOrigin(resp.data);
            setOrigins(origins);
        },
    });

    const getDestinations = useMutation({
        mutationFn: async (code: string) =>
            await axios.post(`${import.meta.env.VITE_API_TRAVEL}/airports/v2`, {
                code,
            }),
        onSuccess: (resp) => {
            const destinations = parseDataToOrigin(resp.data);
            setDestinations(destinations);
        },
    });

    /* const getFlights = useMutation({
        mutationFn: async () =>
            await axios.post(
                `${import.meta.env.VITE_API_TRAVEL}/flights/v2`,
                itinerary
            ),
        onSuccess: (resp) => console.log(resp),
    }); */

    useEffect(() => {
        if (origin.length > 0) {
            const handlerOrigins = setTimeout(() => {
                getOrigins.mutate(origin);
            }, 700);
            return () => clearTimeout(handlerOrigins);
        }
    }, [origin]);

    useEffect(() => {
        if (destination.length > 0) {
            const handlerOrigins = setTimeout(() => {
                getDestinations.mutate(destination);
            }, 700);
            return () => clearTimeout(handlerOrigins);
        }
    }, [destination]);

    const handleChangeOrigin = (event: React.ChangeEvent<HTMLInputElement>) =>
        setOrigin(event.target.value);
    const handleChangeDestination = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setDestination(event.target.value);

    // const handlePickDateRange = (dates: DateRange<dayjs.Dayjs>) => {};
    // const handlePickDate = (date: dayjs.Dayjs | null) => {};

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        /* getFlights.mutate(); */
    };

    return (
        <Container maxWidth={"xl"}>
            <Box className={"flex flex-col bg-white px-6 py-4 rounded-2xl"}>
                <Box className={"flex items-center"}>
                    <GiCommercialAirplane size={30} />
                    <Typography sx={{ fontWeight: 600, fontSize: 20, ml: 2 }}>
                        Reserva tu vuelo
                    </Typography>
                    <FormControl sx={{ ml: 5 }}>
                        <RadioGroup
                            row
                            name="type-flight"
                            defaultValue={"oneway"}
                            onChange={(value) =>
                                setFlightType(value.target.value)
                            }
                        >
                            <FormControlLabel
                                value={"oneway"}
                                control={<Radio />}
                                label={"Solo Ida"}
                            />
                            <FormControlLabel
                                value={"roundtrip"}
                                control={<Radio />}
                                label={"Ida y Vuelta"}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box
                    onSubmit={handleSubmit}
                    component={"form"}
                    sx={{
                        mt: 2,
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                    }}
                >
                    <FormControl>
                        <Autocomplete
                            freeSolo={!getOrigins.isPending}
                            popupIcon={
                                <AiOutlineLoading className="animate-spin" />
                            }
                            clearIcon={false}
                            groupBy={(option) => option.group}
                            sx={{ width: 250 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Origen"
                                    onChange={handleChangeOrigin}
                                />
                            )}
                            options={origins}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            freeSolo={!getDestinations.isPending}
                            popupIcon={
                                <AiOutlineLoading className="animate-spin" />
                            }
                            clearIcon={false}
                            groupBy={(option) => option.group}
                            sx={{ width: 250 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Destino"
                                    onChange={handleChangeDestination}
                                />
                            )}
                            options={destinations}
                        />
                    </FormControl>
                    <FormControl>
                        {flightType === "roundtrip" && (
                            <DemoContainer
                                components={["DateRangePicker"]}
                                sx={{ mt: -1 }}
                            >
                                <DateRangePicker
                                    // onChange={handlePickDateRange}
                                    localeText={{
                                        start: "Ida",
                                        end: "Vuelta",
                                    }}
                                />
                            </DemoContainer>
                        )}
                        {flightType === "oneway" && (
                            <DatePicker
                                // onChange={handlePickDate}
                                label="Ida"
                            />
                        )}
                    </FormControl>
                    <LoadingButton type="submit" variant="contained">
                        Buscar
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};
export default Search;
