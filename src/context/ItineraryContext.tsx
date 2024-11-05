import React, { createContext, ReactNode } from "react";

interface ItineraryType {
    departureCity: string;
    arrivalCity: string;
    hour: string;
}
interface ItineraryContextType {
    itineraries: ItineraryType[] | [];
    direct: boolean;
    currency: string;
    firstClass: boolean;
    qtyPassengers: number;
    adult: number;
    child: number;
    baby: number;
    seat: number;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(
    undefined
);

interface ItineratyContextProvider {
    children: ReactNode;
}

const IntineraryContextProvider: React.FC<ItineratyContextProvider> = ({
    children,
}) => {
    // const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
    // const [direct, setDirect] = useState<boolean>(false);
    // const [currency, setCurrecy] = useState<string>("COP");
    // const [firstClass, setFirstClass] = useState<boolean>(false);
    // const [qtyPassengers, setQtyPassengers] = useState<number>(0);
    // const [adult, setAdult] = useState<number>(0);
    // const [child, setChid] = useState<number>(0);
    // const [baby, setBaby] = useState<number>(0);
    // const [seat, setSeat] = useState<number>(0);
    // const [itinerary, setItinerary] = useState<ItineraryType | undefined>();
    // const [details, setDetails] = useState();

    /* const setItineraryState = (itinerary: ItineraryType|undefined) => {
        setItinerary(itinerary);
        setItineraries({ ...itineraries, itinerary })
    } */

    return (
        <>
            {/* <ItineraryContext.Provider
            value={{
                itineraries,
                direct,
                currency,
                firstClass,
                qtyPassengers,
                adult,
                child,
                baby,
                seat,
            }}
        > */}
            {children}
            {/* </ItineraryContext.Provider> */}
        </>
    );
};
export { ItineraryContext, IntineraryContextProvider };
