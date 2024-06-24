import { useState } from "react";
import axios from 'axios';
import "./style.css"  
function App() {
  // use states
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  // API key
  const apiKey = "30e43e2e9e4627c21821dad710b9595f";

  // function for getting weather data
  const getWeather= async(city) =>{
    try{
    if(city !== ""){

      const request =   await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setWeather(request.data)
      console.log(request.data)
    }
    else{
      alert("Please provide city name!")
    }
    }catch(error){
      setError("city not found")
      setWeather(null)
    }
  }

  // setting weather function
  function handleSubmit(event) {
    event.preventDefault();
    getWeather(city)
  }

  // UI of app
  return (
    <>
      <div className="container"  >
        <h1 className="heading">Weather Application</h1>
        <div className="box">
        <form   onSubmit={handleSubmit} >
          <input type="text"
           placeholder="Enter your city name"
           value={city} onChange={(event) => setCity(event.target.value)} 
          />
           <input type="submit" value="Search" id="btn" className="sub_btn" />   
        </form> 

        <div className="details">
        {error && <p className="error" >{error}</p>}
       { weather &&
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
        </div>}
        </div>
          </div>
      </div>
    </>
  )
} 




export default App
