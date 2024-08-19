import React, { useState, useEffect } from "react";
import axios from "axios";
import TimezoneSelector from "./time_selector/time_selector";
import TimeDisplay from "./time_display/time_display";
import WeatherDisplay from "../Weather_module/weather";
import "../Time_module/_time.scss";

const WorldTime = () => {
  const [time, setTime] = useState(null);
  const [timezone, setTimezone] = useState("Europe/Warsaw");
  const [timezones, setTimezones] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await axios.get(
          "http://worldtimeapi.org/api/timezone"
        );
        setTimezones(response.data);
      } catch (err) {
        setError("Error fetching timezones");
      }
    };

    fetchTimezones();
  }, []);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `http://worldtimeapi.org/api/timezone/${timezone}`
        );
        setTime(response.data);
        setError(null);
        const [, city] = response.data.timezone.split("/");
        setCityName(city.replace("_", " "));
      } catch (err) {
        setError("Error fetching time data");
      }
    };

    fetchTime();
    const intervalId = setInterval(fetchTime, 60000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className={`worldTime_container ${isExpanded ? "expanded" : ""}`}>
      <TimezoneSelector
        timezones={timezones}
        selectedTimezone={timezone}
        onChange={handleChangeTimezone}
      />
      <TimeDisplay
        time={time}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />
      <div className={`additional-info ${isExpanded ? "expanded" : ""}`}>
        {time && (
          <>
            <div className="info_container">
              <div className="info_box">
                <div>
                  <p className="info_title">Current Timezone</p>
                  <h2>{time.timezone}</h2>
                </div>
                <div>
                  <p className="info_title">Day of the Week</p>
                  <h2>{time.day_of_week}</h2>
                </div>
              </div>
              <div className="info_box">
                <div>
                  <p className="info_title">Week Number</p>
                  <h2>{time.week_number}</h2>
                </div>
                <div>
                  <p className="info_title">Day of the Year</p>
                  <h2>{time.day_of_year}</h2>
                </div>
              </div>
              {cityName && <WeatherDisplay cityName={cityName} />}{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorldTime;
