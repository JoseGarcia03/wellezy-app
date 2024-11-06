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
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import {
    addOnewayItinerary,
    setFlights,
} from "../../../store/slices/flight.slice.ts";

interface SearchProps {
    setShowNotify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setShowNotify }) => {
    const [from, setFrom] = useState<string>("");
    const [origins, setOrigins] = useState<Item[]>([]);
    const [to, setTo] = useState<string>("");
    const [destinations, setDestinations] = useState<Item[]>([]);
    const [flightType, setFlightType] = useState<string>("oneway");
    const [checkIn, setCheckIn] = useState<string>("");

    const dispatch = useAppDispatch();
    const { filters } = useAppSelector((state) => state.flight);

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

    const getFlights = useMutation({
        mutationFn: async () =>
            await axios.post(
                `${import.meta.env.VITE_API_TRAVEL}/flights/v2`,
                filters
            ),
        onSuccess: (resp) => dispatch(setFlights(resp.data.data)),
    });

    useEffect(() => {
        if (from.length > 0) {
            const handlerOrigins = setTimeout(() => {
                getOrigins.mutate(from);
            }, 700);
            return () => clearTimeout(handlerOrigins);
        }
    }, [from]);

    useEffect(() => {
        if (to.length > 0) {
            const handlerOrigins = setTimeout(() => {
                getDestinations.mutate(to);
            }, 700);
            return () => clearTimeout(handlerOrigins);
        }
    }, [to]);

    const handleChangeOrigin = (event: React.ChangeEvent<HTMLInputElement>) =>
        setFrom(event.target.value);

    const handleChangeDestination = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setTo(event.target.value);

    // const handlePickDateRange = (dates: DateRange<dayjs.Dayjs>) => {};
    const handlePickDate = (date: dayjs.Dayjs | null) => {
        if (date?.toISOString()) setCheckIn(date.toISOString());
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!from || !to || !checkIn || !flightType) {
            setShowNotify(true);
            return;
        }

        dispatch(
            addOnewayItinerary({
                departureCity: from.toUpperCase(),
                arrivalCity: to.toUpperCase(),
                hour: checkIn,
            })
        );

        getFlights.mutate();
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
                            <DatePicker onChange={handlePickDate} label="Ida" />
                        )}
                    </FormControl>
                    <LoadingButton
                        loading={getFlights.isPending}
                        type="submit"
                        variant="contained"
                    >
                        Buscar
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};
export default Search;
