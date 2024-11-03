export type Item = {
    label: string;
    group: string;
    value: string;
};

interface DataProps {
    airports: [];
    cities: [];
}

interface AirportsProps {
    codeIataAirport: string;
    nameAirport: string;
    new_city: {
        nameCity: string;
    };
    new_country: {
        nameCountry: string;
    };
}

interface CitiesProps {
    codeIataCity: string;
    nameCity: string;
    new_country: {
        nameCountry: string;
        nameSpanish: string;
    };
    new_airports: {
        codeIataAirport: string;
    }[];
}

export const parseDataToOrigin = (data: DataProps): Item[] => {
    const airports: Item[] = data?.airports?.map((airport: AirportsProps) => {
        return {
            group: "Aereopuertos",
            label: `${airport?.nameAirport}, ${airport?.new_city?.nameCity}, ${airport?.new_country?.nameCountry}`,
            value: airport.codeIataAirport,
        };
    });

    const cities: Item[] = data?.cities?.map((city: CitiesProps) => {
        return {
            group: "Ciudades",
            label: `${city?.nameCity}, ${city?.new_country?.nameSpanish}, ${city?.codeIataCity}`,
            value: city.new_airports[0]?.codeIataAirport,
        };
    });

    return cities.concat(airports);
};
