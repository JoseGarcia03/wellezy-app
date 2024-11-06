import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Itinerary {
    departureCity: string;
    arrivalCity: string;
    hour: string;
}

export interface Flights {
    Seg1: {
        segments: {
            companyName: string;
            companyId: {
                marketingCarrier: string;
            };
            loation: {
                locationId: string;
                terminal: number;
                locationName: string;
            }[];
        }[];
        num: string;
    }[];
    priceMin: string;
    companies: string[];
}

export interface FlightSliceState {
    filters: {
        direct: boolean;
        currency: string;
        searchs: number;
        class: boolean;
        qtyPassengers: number;
        adult: number;
        child: number;
        baby: number;
        seat: number;
        itinerary: Itinerary[];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flights: Flights | undefined;
}

const initialState: FlightSliceState = {
    filters: {
        direct: false,
        currency: "COP",
        searchs: 50,
        class: false,
        qtyPassengers: 1,
        adult: 1,
        child: 0,
        baby: 0,
        seat: 0,
        itinerary: [],
    },
    flights: undefined,
};

const FlightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {
        setDirect: (state, action: PayloadAction<boolean>) => {
            state.filters.direct = action.payload;
        },
        setCurrency: (state, action: PayloadAction<string>) => {
            state.filters.currency = action.payload;
        },
        setClass: (state, action: PayloadAction<boolean>) => {
            state.filters.class = action.payload;
        },
        setQtyPassengers: (state, action: PayloadAction<number>) => {
            state.filters.qtyPassengers = action.payload;
        },
        setAdult: (state, action: PayloadAction<number>) => {
            state.filters.adult = action.payload;
        },
        setChild: (state, action: PayloadAction<number>) => {
            state.filters.child = action.payload;
        },
        setBaby: (state, action: PayloadAction<number>) => {
            state.filters.baby = action.payload;
        },
        setSeat: (state, action: PayloadAction<number>) => {
            state.filters.seat = action.payload;
        },
        addOnewayItinerary: (state, action: PayloadAction<Itinerary>) => {
            state.filters.itinerary = [action.payload];
        },
        editItinerary: (state, action: PayloadAction<Itinerary>) => {
            state.filters.itinerary = [action.payload];
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFlights: (state, action: PayloadAction<Flights>) => {
            state.flights = action.payload;
        },
    },
});

export const { addOnewayItinerary, editItinerary, setFlights } =
    FlightSlice.actions;
export default FlightSlice.reducer;
