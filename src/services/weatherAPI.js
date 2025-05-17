const API_KEY = import.meta.env.VITE_ACCU_API;
const BASE_URL = 'https://dataservice.accuweather.com';

const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

export const getLocationKey = async (searchQuery) => {
    if (!API_KEY) throw new Error('Missing API key');
    let url;
    if (typeof searchQuery === 'object' && searchQuery?.lat && searchQuery?.lon) {
        url = `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${searchQuery.lat},${searchQuery.lon}`;
    } else if (typeof searchQuery === 'string') {
        url = `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${searchQuery}`;
    } else if (searchQuery?.postalCode) {
        url = `${BASE_URL}/locations/v1/postalcodes/search?apikey=${API_KEY}&q=${searchQuery.postalCode}`;
    } else {
        return null;
    }
    try {
        const data = await fetchJson(url);
        const loc = Array.isArray(data) ? data[0] : data;
        if (loc?.Key) {
            return {
                key: loc.Key,
                name: loc.LocalizedName,
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting location key:', error);
        return null;
    }
};

export const getCurrentConditions = async (locationKey) => {
    if (!API_KEY) throw new Error('Missing API key');
    const url = `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`;
    try {
        const data = await fetchJson(url);
        return data[0];
    } catch (error) {
        console.error('Error getting current conditions:', error);
        return null;
    }
};

export const get5DayForecast = async (locationKey) => {
    if (!API_KEY) throw new Error('Missing API key');
    const url = `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`;
    try {
        const data = await fetchJson(url);
        return data.DailyForecasts || [];
    } catch (error) {
        console.error('Error getting 5-day forecast:', error);
        return [];
    }
};

export const getMinuteCast = async (locationKey) => {
    if (!API_KEY) throw new Error('Missing API key');
    const url = `${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&details=true`;
    try {
        const data = await fetchJson(url);
        return data || [];
    } catch (error) {
        console.error('Error getting MinuteCast data:', error);
        return [];
    }
};