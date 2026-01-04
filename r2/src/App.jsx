import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.scss';
import './buttons.scss';
import './App.scss';
import axios from 'axios';



export default function App() {

  const [weatherData, setWeatherData] = useState();
  console.log(weatherData)

  // const conditionIcons = {
  //     'clear': '☀️',
  //     'partly-cloudy': '⛅',
  //     'cloudy': '☁️',
  //     'rain': '🌧️',
  //     'fog': '🌫️',
  //     'thunder': '🌩️',
  //     'snow': '❄️',
  //     'na': '❔'
  // };

  const conditionTextLt = {
    'clear': 'Giedra',
    'cloudy-with-sunny-intervals': 'Dalinai debesuota',
    'cloudy': 'Debesuota',
    'overcast': 'Apsiniaukę',
    'light-rain': 'Nedidelis lietus',
    'rain': 'Vidutinis lietus',
    'heavy-rain': 'Smarkus lietus',
    'sleet': 'Šlapdriba',
    'snow': 'Sniegas',
    'heavy-snow': 'Smarkus sniegas',
    'light-snow': 'Nedidelis sniegas',
    'fog': 'Rūkas',
    'heavy-rain-with-thunderstorms': 'Perkūnija ir lietus',
    'isolated-thunderstorms': 'Perkūnija ir lietus',
    'thunderstorms': 'Perkūnijos',
    'thunder': 'Perkūnija',
    'partly-cloudy': 'Mažai debesuota',
    'scattered-clouds': 'Debesuota su pragiedruliais',
    'hail': 'Kruša',
    'na': 'Nežinoma'
  };


  // useEffect(() => {
  //     axios.get('http://localhost:3001/weather')
  //         .then(res => {
  //             console.log(res.data);
  //             // artimiausia prognozė 
  //             const forecast = res.data.forecastTimestamps[0];
  //             setWeatherData({
  //                 location: res.data.place.name,
  //                 temperature: forecast.airTemperature,
  //                 condition: forecast.conditionCode,
  //                 forecastTime: forecast.forecastTimeUtc
  //             });
  //         })
  //         .catch(err => {
  //             console.error('Error fetching weather data:', err);
  //         });
  // }, []);

  // useEffect(() => {
  //     axios.get('http://localhost:3001/weather')
  //         .then(res => {
  //             console.log(res.data);
  //             const now = new Date(); // Dabartinis laikas
  //             const forecasts = res.data.forecastTimestamps;

  //             const nextForecast = forecasts.find(f => new Date(f.forecastTimeUtc) >= now);

  //             if (nextForecast) {
  //                 setWeatherData({
  //                     location: res.data.place.name,
  //                     temperature: nextForecast.airTemperature,
  //                     condition: nextForecast.conditionCode,
  //                     forecastTime: nextForecast.forecastTimeUtc
  //                 });
  //             } else {
  //                 console.warn('Nerasta artimiausios prognozės.');
  //             }
  //         })
  //         .catch(err => {
  //             console.error('Klaida gaunant orus:', err);
  //         });
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/weather')
      .then(res => {

        console.log(res.data);
        const now = new Date();
        const forecasts = res.data.forecastTimestamps;

        const currentIndex = forecasts
          .map(f => new Date(f.forecastTimeUtc))
          .findLastIndex(fTime => fTime <= now);

        const upcomingForecasts = forecasts.slice(currentIndex, currentIndex + 9);
        const current = upcomingForecasts[0] || forecasts[0];

        const creationDate = new Date(res.data.forecastCreationTimeUtc);
        const weekday = creationDate.toLocaleDateString('lt-LT', { weekday: 'long' });
        const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

        setWeatherData({
          location: res.data.place.name,
          temperature: current.airTemperature,
          condition: current.conditionCode,
          forecastTime: current.forecastTimeUtc,
          weekday: capitalizedWeekday,
          upcoming: upcomingForecasts
        });
      })
      .catch(err => {
        console.error('Error fetching weather data:', err);
      });
  }, []);



  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      minHeight: '100vh',
      backgroundColor: 'rgba(209, 18, 18, 0.8)'
    }}>
      <h1 className="text-center text-white mb-4">Orų prognozė</h1>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        // backgroundImage: 'url(/palanga-saulelydis.jpg)',
        // backgroundSize: 'cover',
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // position: 'relative',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '15px',
        color: 'white',
        padding: '20px',
        width: '100%',
        maxWidth: '1000px',
        textAlign: 'center',
        backdropFilter: 'blur(5px)'
      }}>
        {weatherData ? (
          <>
            {/* Dabartinė prognozė */}
            <div style={{
              //backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backgroundImage: 'url(/klevas.jpg)',
              backgroundSize: 'cover',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px'
            }}>
              <h2>{weatherData.location}</h2>
              <p style={{ fontSize: '18px' }}>{weatherData.weekday}</p>
              <img
                src={`/icons/${weatherData.upcoming[0].conditionCode || 'na'}.png`}
                onError={(e) => { e.target.src = '/icons/na.png'; }}
                alt={weatherData.upcoming[0].conditionCode}
                style={{ width: '64px', height: '64px', margin: '10px auto' }}
              />
              <p style={{ fontSize: '20px' }}>
                <b>{weatherData.upcoming[0].airTemperature}°C</b>
              </p>
              <p style={{ fontSize: '18px' }}>
                {conditionTextLt[weatherData.upcoming[0].conditionCode] || 'Nežinoma'}
              </p>
              <p style={{ fontSize: '14px' }}>
                {new Date(weatherData.upcoming[0].forecastTimeUtc).toLocaleString('lt-LT')}
              </p>
            </div>

            {/* Kitos 4 valandos */}
            <hr style={{ borderColor: 'white', margin: '20px 0' }} />
            <h4>Kitos 4 valandos</h4>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '10px',
              marginTop: '15px',
              flexWrap: 'wrap'
            }}>
              {weatherData.upcoming.slice(1).map((forecast, index) => (
                <div key={index} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '10px',
                  padding: '10px',
                  width: '100px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
                    {new Date(forecast.forecastTimeUtc).toLocaleTimeString('lt-LT', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <img
                    src={`/icons/${forecast.conditionCode || 'na'}.png`}
                    onError={(e) => { e.target.src = '/icons/na.png'; }}
                    alt={forecast.conditionCode}
                    style={{ width: '32px', height: '32px' }}
                  />
                  <p style={{ fontSize: '14px', margin: '4px 0' }}>
                    {forecast.airTemperature}°C
                  </p>
                  <p style={{ fontSize: '12px' }}>
                    {conditionTextLt[forecast.conditionCode] || forecast.conditionCode}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );



}


