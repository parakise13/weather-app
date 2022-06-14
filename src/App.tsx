import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface WeatherDetailProps {
  main?: string;
}

interface WeatherMainProps{
  humidity?: number;
  temp_min?: number;
  temp_max?: number;
  temp?: number;
  feels_like?: number;
}

interface WeatherProps {
  name?: string;
  main?: WeatherMainProps;
  weather?: WeatherDetailProps[];
}

function App() {
  const [data, setData] = useState<WeatherProps>({});
  const [location, setLocation] = useState("");

  const APIKey = "64d28b810aabcf14458d21729721bc51";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`;

  // const convertFtoC = (fahrenheit: number) => {
  //   return (fahrenheit - 273.15).toFixed(1);
  // };

  const searchLocation = (evt:React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data)
        setLocation('');
      })
    }
  }

  const handleChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(evt.target.value);
  }


  return (
    <div className="app">
      <div className="search">
        <input type="text" value={location} onChange={handleChangeValue} placeholder='Enter Location' onKeyDown={searchLocation} />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{ data.name }</p>
          </div>
          <div className="temp">
            {/* <h1>{data.main?.temp && `${convertFtoC(data.main?.temp)}°`}</h1> */}
            <h1>{data.main?.temp && `${data.main?.temp}°`}</h1>
          </div>
          <div className="description">
            <p>{ data.weather && data.weather[0].main }</p> 
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {/* <p className="bold">{data.main?.feels_like && `${convertFtoC(data.main?.feels_like)}°`}</p> */}
            <p className="bold">{data.main?.feels_like && `${data.main?.feels_like}°`}</p>
            <p className="small">Feels Like</p>
          </div>
          <div className="temp_min">
            {/* <p className="bold">{data.main?.temp_min && `${convertFtoC(data.main?.temp_min)}°`}</p> */}
            <p className="bold">{data.main?.temp_min && `${data.main?.temp_min}°`}</p>
            <p className="small">Temparature Min</p>
          </div>
          <div className="temp_max">
            {/* <p className="bold">{data.main?.temp_max && `${convertFtoC(data.main?.temp_max)}°`}</p> */}
            <p className="bold">{data.main?.temp_max && `${data.main?.temp_max}°`}</p>
            <p className="small">Temparature Max</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main?.humidity && `${data.main?.humidity}%`}</p>
            <p className="small">Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
