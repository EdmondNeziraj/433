import { useState, useEffect } from 'react';
import '../styles/Weather.css';
import sunny from '../sunny.jpg';
// import rainy from '../assets/images/weather/rainy.jpg'

function Weather({ date, zip}) {
    const [temp, setTemp] = useState('60');
    const [humidity, setHumidity] = useState('70');
    const [condition, setCondition] = useState('Sunny')
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {

            const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3269e5b1c838479f82a51845221712&q=${zip}&dt=${date}`)
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
        <div className='weather-container' style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${sunny})`}}>
            <h4 className='card-title'>Weather</h4>
            <p>Temperature: {temp}F</p>
            <p>Humidity: {humidity}%</p>
            <p>Condition: {condition}</p>
            <div className='weather-icon'><img src={image} alt="" /></div>
        </div>
    );
}

export default Weather;
