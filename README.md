# AuraSphere - Modern Weather Application

## 🌦️ Overview

AuraSphere is a modern, responsive weather application built with React and Vite. It provides real-time weather information, forecasts, and MinuteCast data using the AccuWeather API. The application offers a beautiful user interface with detailed weather metrics and location-based services.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any location
- **5-Day Forecast**: Plan ahead with a detailed 5-day weather forecast
- **MinuteCast**: Minute-by-minute precipitation forecasts for the next 12 hours
- **Geolocation Support**: Automatically detect and display weather for your current location
- **Search Functionality**: Search for weather information by city name, coordinates, or postal code
- **Detailed Metrics**: View comprehensive weather data including:
  - Temperature (actual and RealFeel®)
  - Humidity
  - Wind speed and direction
  - Atmospheric pressure
  - UV Index
  - Visibility
  - Precipitation probability

## 🚀 Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/kunalkcube/aurasphere.git
   cd aurasphere
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your AccuWeather API key
   ```
   VITE_ACCU_API=your_accuweather_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Technologies Used

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 4
- **Animation**: Motion
- **API**: AccuWeather API

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.