import { useState, useEffect } from 'react';
import '../styles/Weather.css';
import sunny from '../sunny.jpg';
import rainy from '../rainy.jpg'

function Weather({ date, zip}) {
    const [temp, setTemp] = useState('60');
    const [humidity, setHumidity] = useState('70');
    const [condition, setCondition] = useState('Sunny')
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {

            const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3269e5b1c838479f82a51845221712&q=${zip}&dt=2023-01-13`)
            const json = await data.json();

            const day = json.forecast.forecastday[0].day;

            setTemp(day.avgtemp_f);
            setHumidity(day.avghumidity);
            setCondition(day.condition.text);
            setImage(day.condition.icon);
        }

        fetchWeather();
    }, []) 

    console.log(date, zip, temp, humidity, condition); 
 
    return (
        <div className='weather-container' style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${rainy})`}}>
        {/* // <div className='weather-container'> */}
            <h4 className='card-title'>Weather</h4>
            <p>temperature: {temp}F</p>
            <p>humidity: {humidity}%</p>
            <p>condition: {condition}</p>
            <p><img src={image} alt="" /></p>
        </div>
    );
}

export default Weather;
