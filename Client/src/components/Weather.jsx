import { useState, useEffect } from 'react';
import '../styles/Weather.css';
import cloudy from '../assets/images/weather/cloudy.jpg';

function Weather({ date, zip}) {
    const [temp, setTemp] = useState('60');
    const [humidity, setHumidity] = useState('70');
    const [condition, setCondition] = useState('Sunny')
    const [image, setImage] = useState('');
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        setApiKey(process.env.REACT_APP_API_KEY);
        const fetchWeather = async () => {

            const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${zip}&dt=${date}`)
            const json = await data.json();

            const day = json.forecast.forecastday[0].day;

            setTemp(day.avgtemp_f);
            setHumidity(day.avghumidity);
            setCondition(day.condition.text);
            setImage(day.condition.icon);
        }

        fetchWeather();
    }, [date, zip, apiKey]) 

    return (
        <div className='weather-container' style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${cloudy})`}}>
            <h4 className='card-title'>Weather</h4>
            <p>Temperature: {temp}F</p>
            <p>Humidity: {humidity}%</p>
            <p>Condition: {condition}</p>
            <div className='weather-icon'><img src={image} alt="" /></div>
        </div>
    );
}

export default Weather;