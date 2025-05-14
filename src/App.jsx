import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import { Humidity, Precipitation, Pressure, RealFeel, UV, Visibility, Wind } from './assets'

const App = () => {
  const {
    location,
    currentWeather,
    forecast,
    minuteCast,
    loading,
    error,
    searchLocation
  } = useWeather();

  const [showSearch, setShowSearch] = useState(false);

  // Handle loading state
  if (loading) {
    return (
      <div className='relative w-full h-screen flex flex-col justify-center items-center bg-[#F3E7DB] font-geist'>
        <p className='text-2xl font-semibold'>Loading weather data...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className='relative w-full h-screen flex flex-col justify-center items-center bg-[#F3E7DB] font-geist'>
        <p className='text-2xl font-semibold text-[#CE4B43]'>Error: {error}</p>
        <button
          className='mt-4 px-4 py-2 bg-[#CE4B43] text-white rounded-md'
          onClick={() => searchLocation('Muktapur, Assam')}
        >
          Try Again
        </button>
      </div>
    );
  }

  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Get temperature in Celsius
  const currentTemp = currentWeather ? Math.round(currentWeather.Temperature.Metric.Value) : 0;

  return (
    <div className='relative w-full h-screen flex flex-col justify-start bg-[#F3E7DB] items-center font-geist'>
      <div className='w-full flex flex-col justify-start items-center max-w-3xl overflow-x-hidden overflow-y-auto'>
        <div className='w-full h-20 flex justify-between items-center p-4'>
          <div className='flex flex-col justify-start font-semibold'>
            <p className='text-xs text-[#CE4B43]'>{location}</p>
            <p className='text-base'>Today, {formattedToday}</p>
          </div>
          <div className='flex justify-center items-center cursor-pointer' onClick={() => setShowSearch(!showSearch)}>
            <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.60001 4.90001C1.60001 3.07747 3.07747 1.60001 4.90001 1.60001C6.72255 1.60001 8.20001 3.07747 8.20001 4.90001C8.20001 6.72255 6.72255 8.20001 4.90001 8.20001C3.07747 8.20001 1.60001 6.72255 1.60001 4.90001ZM4.90001 0.200013C2.30427 0.200013 0.200012 2.30427 0.200012 4.90001C0.200012 7.49575 2.30427 9.60001 4.90001 9.60001C5.87256 9.60001 6.77612 9.30462 7.52586 8.79865L10.2636 11.5364C10.6151 11.8879 11.1849 11.8879 11.5364 11.5364C11.8879 11.1849 11.8879 10.6151 11.5364 10.2636L8.79865 7.52586C9.30462 6.77612 9.60001 5.87256 9.60001 4.90001C9.60001 2.30427 7.49575 0.200013 4.90001 0.200013Z" fill="black" />
            </svg>
          </div>
        </div>

        {showSearch && (
          <SearchBar onSearch={searchLocation} onClose={() => setShowSearch(false)} />
        )}

        <div className='w-full relative flex flex-col justify-center items-center px-4 pt-20 pb-8 mb-4'>
          <p className='relative font-bold text-9xl z-20'>{currentTemp}<span className='absolute -top-4 font-medium'>°</span></p>
          <div className='absolute w-100 h-100 -right-28 top-0 flex justify-center items-center z-10'>
            <img
              src={`https://www.accuweather.com/images/weathericons/${currentWeather.WeatherIcon}.svg`}
              className='w-full h-full object-contain'
            />
          </div>
          <div className="w-full flex flex-col space-y-4 mt-2 z-20">
            {/* Weather description */}
            <div className="flex justify-center items-center">
              <span className="px-4 py-1.5 bg-white/80 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-full text-lg font-medium">
                {currentWeather.WeatherText}
              </span>
            </div>

            {/* Weather stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full mt-2">
              {/* Real Feel */}
              <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-3 flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className='flex justify-center items-center w-5 h-5'>
                    <img src={RealFeel} className='w-full h-full object-contain' />
                  </div>
                  <span className="text-sm font-semibold">Real Feel</span>
                </div>
                <span className="text-xl font-bold">{Math.round(currentWeather.RealFeelTemperature.Metric.Value)}°</span>
                <span className="text-xs text-gray-600">{currentWeather.RealFeelTemperature.Metric.Phrase}</span>
              </div>

              {/* Humidity */}
              <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-3 flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className='flex justify-center items-center w-5 h-5'>
                    <img src={Humidity} className='w-full h-full object-contain' />
                  </div>
                  <span className="text-sm font-semibold">Humidity</span>
                </div>
                <span className="text-xl font-bold">{currentWeather.RelativeHumidity}%</span>
                <span className="text-xs text-gray-600">Dew Point: {Math.round(currentWeather.DewPoint.Metric.Value)}°</span>
              </div>

              {/* Wind */}
              <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-3 flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className='flex justify-center items-center w-5 h-5'>
                    <img src={Wind} className='w-full h-full object-contain' />
                  </div>
                  <span className="text-sm font-semibold">Wind</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold">{currentWeather.Wind.Speed.Metric.Value}</span>
                  <span className="text-lg">km/h</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <span>Direction:</span>
                  <span>{currentWeather.Wind.Direction.Localized} ({currentWeather.Wind.Direction.Degrees}°)</span>
                </div>
              </div>

              {/* Pressure */}
              <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-3 flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className='flex justify-center items-center w-5 h-5'>
                    <img src={Pressure} className='w-full h-full object-contain' />
                  </div>
                  <span className="text-sm font-semibold">Pressure</span>
                </div>
                <span className="text-xl font-bold">{currentWeather.Pressure.Metric.Value} mb</span>
                <span className="text-xs text-gray-600">{currentWeather.PressureTendency.LocalizedText}</span>
              </div>

              {/* Visibility */}
              <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-3 flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className='flex justify-center items-center w-5 h-5'>
                    <img src={Visibility} className='w-full h-full object-contain' />
                  </div>
                  <span className="text-sm font-semibold">Visibility</span>
                </div>
                <span className="text-xl font-bold">{currentWeather.Visibility.Metric.Value} km</span>
                <span className="text-xs text-gray-600">Cloud Cover: {currentWeather.CloudCover}%</span>
              </div>

              {/* UV Index */}
              <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-3 flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className='flex justify-center items-center w-5 h-5'>
                    <img src={UV} className='w-full h-full object-contain' />
                  </div>
                  <span className="text-sm font-semibold">UV Index</span>
                </div>
                <span className="text-xl font-bold">{currentWeather.UVIndex}</span>
                <span className="text-xs text-gray-600">{currentWeather.UVIndexText}</span>
              </div>
            </div>

            {/* Precipitation */}
            <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className='flex justify-center items-center w-5 h-5'>
                  <img src={Precipitation} className='w-full h-full object-contain' />
                </div>
                <span className="text-sm font-semibold">Precipitation</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Past 3 hours:</span>
                  <span className="text-sm font-medium">{currentWeather.PrecipitationSummary.Past3Hours.Metric.Value} mm</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min(currentWeather.PrecipitationSummary.Past3Hours.Metric.Value * 5, 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-600">Past 24 hours:</span>
                  <span className="text-sm font-medium">{currentWeather.PrecipitationSummary.Past24Hours.Metric.Value} mm</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min(currentWeather.PrecipitationSummary.Past24Hours.Metric.Value * 2, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Temperature Summary */}
            <div className="bg-white/60 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className='flex justify-center items-center w-5 h-5'>
                  <img src={RealFeel} className='w-full h-full object-contain' />
                </div>
                <span className="text-sm font-semibold">Temperature Range</span>
              </div>

              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Today:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-600 font-medium">
                    {Math.round(currentWeather.TemperatureSummary.Past24HourRange.Minimum.Metric.Value)}°
                  </span>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
                  <span className="text-xs text-red-600 font-medium">
                    {Math.round(currentWeather.TemperatureSummary.Past24HourRange.Maximum.Metric.Value)}°
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-600 mt-2">
                Temperature is {currentWeather.Past24HourTemperatureDeparture.Metric.Value > 0 ? 'higher' : 'lower'} than yesterday by {Math.abs(currentWeather.Past24HourTemperatureDeparture.Metric.Value)}°C
              </div>
            </div>

            {/* Last updated */}
            <div className="flex justify-center items-center mt-2">
              <span className="text-xs text-gray-500">
                Last updated: {new Date(currentWeather.LocalObservationDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
            </div>

            <div className='relative w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1'>
              <div className='flex space-x-3 px-4' style={{ minWidth: 'max-content' }}>
                {minuteCast && minuteCast.map((hour, index) => {
                  const hourTime = new Date(hour.DateTime);
                  const displayTime = hourTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                  const temp = Math.round((hour.Temperature.Value - 32) * 5 / 9);

                  return (
                    <div
                      key={index}
                      className={`flex flex-col justify-start items-center min-w-20 p-3 rounded-xl backdrop-blur-sm ${index === 0 ? 'bg-[#E395A1]/80 border-b-2 border-[#CE4B43]' : 'bg-white/60'}`}
                    >
                      <span className='text-xs font-medium mb-1'>{displayTime}</span>

                      <div className='w-10 h-10 my-1 flex justify-center items-center'>
                        <img
                          src={`https://www.accuweather.com/images/weathericons/${hour.WeatherIcon}.svg`}
                          className='w-full h-full object-contain'
                          alt={hour.IconPhrase}
                        />
                      </div>

                      <span className='relative text-lg font-bold'>{temp}<span className='absolute -top-0.5 font-medium'>°</span></span>

                      <div className='flex items-center mt-1'>
                        <div className='flex justify-center items-center w-2 h-2'>
                          <img src={Humidity} className='w-full h-full object-contain' />
                        </div>
                        <span className='text-xs ml-1'>{hour.RelativeHumidity}%</span>
                      </div>

                      {hour.HasPrecipitation && (
                        <div className='flex items-center justify-center mt-1'>
                          <span className='px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs'>
                            {hour.PrecipitationProbability}%
                          </span>
                        </div>
                      )}

                      <div className='flex items-center mt-1'>
                        <div className='flex justify-center items-center w-2 h-2'>
                          <img src={Wind} className='w-full h-full object-contain' />
                        </div>
                        <span className='text-xs ml-1'>{Math.round(hour.Wind.Speed.Value)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='px-4 mt-2'>
              <div className='w-full flex items-center justify-center'>
                <div className='px-4 py-1.5 bg-white/80 border-b border-b-[#CE4B43] backdrop-blur-sm rounded-full'>
                  <div className='flex items-center space-x-1 text-sm'>
                    <span className='font-medium'>Summary:</span>
                    <span>{minuteCast && minuteCast[0]?.IconPhrase || 'Weather data available'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col justify-between items-center p-4'>
          {forecast && forecast.map((day, index) => {
            const date = new Date(day.Date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dayNumber = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'long' });
            const tempMax = Math.round(day.Temperature.Maximum.Value);
            const tempMin = Math.round(day.Temperature.Minimum.Value);

            return (
              <div key={index} className='w-full flex justify-between items-center border-t-2 border-[#CE4B43] py-2'>
                <div className='flex flex-col justify-start font-semibold'>
                  <p className='text-base mb-1'>{month} {dayNumber}, {dayName}</p>
                  <p className='text-xs text-[#CE4B43]'>{location}</p>
                </div>
                <div className='flex flex-row w-1/3 justify-between items-center'>
                  <div className='flex flex-col justify-center items-center'>
                    <div className='w-10 h-10 flex justify-center items-center'>
                      <img
                        src={`https://www.accuweather.com/images/weathericons/${day.Day.Icon}.svg`}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <p className='text-xs font-medium'>
                      {tempMax}°
                    </p>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className='w-10 flex justify-center items-center'>
                      <img
                        src={`https://www.accuweather.com/images/weathericons/${day.Night.Icon}.svg`}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <p className='text-xs font-medium'>
                      {tempMin}°
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F3E7DB] to-transparent z-30"></div>
    </div>
  )
}

export default App