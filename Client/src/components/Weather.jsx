import { useState, useEffect } from 'react';
import '../styles/Weather.css';
import sunny from '../sunny.jpg';
import rainy from '../rainy.jpg'

function Weather({ date, zip}) {
    const [temp, setTemp] = useState('60');
    const [humidity, setHumidity] = useState('70');
    const [condition, setCondition] = useState('Sunny')

    useEffect(() => {
        const fetchWeather = async () => {

            const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3269e5b1c838479f82a51845221712&q=${zip}&dt=${date}`)
            const json = await data.json();

            const day = json.forecast.forecastday[0].day;

            setTemp(day.avgtemp_f);
            setHumidity(day.avghumidity);
            setCondition(day.condition.text);
        }

        fetchWeather();
    }, []) 

    console.log(date, zip, temp, humidity, condition); 
 
    return (
        <div className='weather-container' style={{backgroundImage:`url(${rainy})`}}>
            <h4 className='card-title'>Weather</h4>
            <p>temperature: {temp}F</p>
            <p>humidity: {humidity}%</p>
            <p>condition: {condition}</p>
        </div>
    );
}

export default Weather;
