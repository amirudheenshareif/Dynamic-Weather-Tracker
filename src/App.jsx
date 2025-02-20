import { useState,useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



function App() {
  let api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [temp, setTemp] = useState();
  const [city, setCity] = useState("");
  const[searchCity,setSearchCity] = useState("");
  const[humidity,setHumidity]=useState();
  const[wind,setWind]=useState();
  const[loading,setLoading]=useState(false);
  const[errorMsg,setErrorMsg]=useState("");


  async function getWeatherData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${api_key}&units=metric`;

    try {
      setErrorMsg("");
      setLoading(true)
      const response = await fetch(url);
      const data = await response.json();

       if (response.ok) {
      setTemp(data.main.temp);
      setCity(searchCity);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
    }
    else{
      setErrorMsg("City not Found");
      setTemp(null);
      setCity("");
      setHumidity(null);
      setWind(null);
    }

      
    } catch (error) {
      console.log("Error is:",error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city) {
      getWeatherData();
    }
  }, [city]);



return (

    <>
    <div className="container">
      <h1>Weather Application</h1>
      <div className="inputContainer">
        <input type="text" placeholder='Search for cities' value={searchCity} onChange={(e)=>{setSearchCity(e.target.value)}}  />
        <FontAwesomeIcon className='searchIcon' onClick={getWeatherData}  icon={faMagnifyingGlass} />
      </div>
      {
      loading ? (<p className='loader'>Loading...</p>)
              :
     ( <div className="innerContainer">
      <h2 >Weather in {city}</h2>
      <p className='temp'>{temp} °C</p>
      <p>Humidity: {humidity} %</p>
      <p>Wind speed: {wind} km/hr</p>
       <p className='errorMsg'>{errorMsg}</p>
      </div>)}
    </div>
    </>
  )
}

export default App
