import { useState, useEffect } from 'react';
import { getLocationKey, getCurrentConditions, get5DayForecast, getMinuteCast } from '../services/weatherAPI';

export const useWeather = () => {
    const [location, setLocation] = useState('Muktapur, Assam');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [minuteCast, setMinuteCast] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeatherData = async (searchQuery) => {
        try {
            setLoading(true);
            setError(null);

            // Get location key and details
            const locationData = await getLocationKey(searchQuery);
            if (!locationData || !locationData.key) {
                throw new Error('Location not found');
            }

            setLocation(locationData.name);

            // Get current conditions
            const currentData = await getCurrentConditions(locationData.key);
            setCurrentWeather(currentData);

            // Get 5-day forecast
            const forecastData = await get5DayForecast(locationData.key);
            setForecast(forecastData);

            // Get MinuteCast data
            const minuteCastData = await getMinuteCast(locationData.key);
            setMinuteCast(minuteCastData);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherData({ lat: latitude, lon: longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    fetchWeatherData('Muktapur, Assam'); // Default location
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
            fetchWeatherData('Muktapur, Assam'); // Default location
        }
    };

    const searchLocation = (query) => {
        fetchWeatherData(query);
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    return {
        location,
        currentWeather,
        forecast,
        minuteCast,
        loading,
        error,
        searchLocation
    };
};