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
        'moderate-rain': 'Vidutinis lietus',
        'heavy-rain': 'Smarkus lietus',
        'sleet': 'Šlapdriba',
        'snow': 'Sniegas',
        'fog': 'Rūkas',
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

                const closestForecast = forecasts.reduce((prev, curr) => {
                    const prevDiff = Math.abs(new Date(prev.forecastTimeUtc) - now);
                    const currDiff = Math.abs(new Date(curr.forecastTimeUtc) - now);
                    return currDiff < prevDiff ? curr : prev;
                });

                setWeatherData({
                    location: res.data.place.name,
                    temperature: closestForecast.airTemperature,
                    condition: closestForecast.conditionCode,
                    forecastTime: closestForecast.forecastTimeUtc
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
            height: '100vh',
            backgroundColor: 'rgba(28, 49, 241, 0.8)'
        }}>
            <h1 className="text-center">Orų prognozė</h1>
            <div className="row" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                //backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                height: '350px',
                width: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <div className="col-12 text-center">
                    {weatherData ? (
                        <div className="weather-info">
                            <h2>{weatherData.location}</h2>
                            <img
                                src={`/icons/${weatherData.condition || 'na'}.png`}
                                onError={(e) => { e.target.src = '/icons/na.png'; }}
                                alt={weatherData.condition}
                                style={{ width: '64px', height: '64px', margin: '10px auto' }}
                            />
                            <p style={{ fontSize: '20px' }}>Temperatūra:<b> {weatherData.temperature}°C</b></p>
                            <p style={{ fontSize: '18px' }}>Oro sąlygos:<b> {conditionTextLt[weatherData.condition] || 'Nežinoma'}</b></p>
                            <p style={{ fontSize: '16px' }}>Prognozės laikas: <b>{new Date(weatherData.forecastTime).toLocaleString()}</b></p>
                        </div>
                    ) : (
                        <p>Loading weather data...</p>
                    )}
                </div>
            </div>
        </div >

    );
}


