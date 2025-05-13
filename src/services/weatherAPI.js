const API_KEY = import.meta.env.VITE_ACCU_API;
const BASE_URL = 'https://dataservice.accuweather.com';

export const getLocationKey = async (searchQuery) => {
    try {
        let url;
        // Check if searchQuery is coordinates
        if (typeof searchQuery === 'object' && searchQuery.lat && searchQuery.lon) {
            url = `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${searchQuery.lat},${searchQuery.lon}`;
        }
        // Or if it's a city name
        else if (typeof searchQuery === 'string') {
            url = `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${searchQuery}`;
        }
        // Or if it's a postal code
        else if (searchQuery.postalCode) {
            url = `${BASE_URL}/locations/v1/postalcodes/search?apikey=${API_KEY}&q=${searchQuery.postalCode}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return Array.isArray(data) ? data[0]?.Key : data?.Key;
    } catch (error) {
        console.error('Error getting location key:', error);
        return null;
    }
};

export const getCurrentConditions = async (locationKey) => {
    try {
        const url = `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`;
        const response = await fetch(url);
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error getting current conditions:', error);
        return null;
    }
};

export const get5DayForecast = async (locationKey) => {
    try {
        const url = `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`;
        const response = await fetch(url);
        const data = await response.json();
        return data.DailyForecasts;
    } catch (error) {
        console.error('Error getting 5-day forecast:', error);
        return [];
    }
};

export const getMinuteCast = async (locationKey) => {
    try {
        const url = `${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&details=true`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting MinuteCast data:', error);
        return null;
    }
};