import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import "../time_display/_time_display.scss";
import sunIcon from "../../gallery/icons/icon-sun.svg";
import moonIcon from "../../gallery/icons/icon-moon.svg";
import arrowIcon from "../../gallery/icons/icon-arrow-down.svg";

const TimeDisplay = ({ time, isExpanded, toggleExpand }) => {
  const [localTime, setLocalTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(sunIcon);

  useEffect(() => {
    if (time) {
      const utcDate = parseISO(time.datetime);
      const zonedDate = toZonedTime(utcDate, time.timezone);
      setLocalTime(zonedDate);

      const intervalId = setInterval(() => {
        setLocalTime((prevTime) => new Date(prevTime.getTime() + 60000));
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [time]);

  useEffect(() => {
    if (localTime) {
      const hour = localTime.getHours();
      let bodyClass = "";
      let greetingMessage = "";
      let greetingIcon = sunIcon;

      if (hour >= 5 && hour < 12) {
        bodyClass = "morning";
        greetingMessage = "Good morning, it's currently";
        greetingIcon = sunIcon;
      } else if (hour >= 12 && hour < 18) {
        bodyClass = "afternoon";
        greetingMessage = "Good afternoon, it's currently";
        greetingIcon = sunIcon;
      } else  if(hour >= 18 && hour < 22){
        bodyClass = "evening";
        greetingMessage = "Good evening, it's currently";
        greetingIcon = moonIcon;
      } else {
        bodyClass = "night";
        greetingMessage = "Hello, Night Owl, it's currently";
        greetingIcon = moonIcon;
      }

      setGreeting(greetingMessage);
      setIcon(greetingIcon);

      document.body.className = "";
      document.body.classList.add(bodyClass);
    } else {
      document.body.className = "default";
    }
  }, [localTime]);

  if (!time || !localTime) return <p>Loading...</p>;

  const formattedDate = format(localTime, "MMMM d, yyyy");
  const formattedTime = format(localTime, "HH:mm");
  const [continent, city] = time.timezone.split("/");
  const continentAbbreviations = {
    Africa: "AF",
    America: "AM",
    Antarctica: "AN",
    Arctic: "ARC",
    Asia: "AS",
    Atlantic: "ATL",
    Australia: "AUS",
    Europe: "EU",
    Indian: "IND",
    Pacific: "PAC",
  };

  const continentAbbreviation = continentAbbreviations[continent] || continent;

  return (
    <div className={`timeDisplay ${isExpanded ? "expanded" : ""}`}>
      <p className="timeDisplay_text">
        <img className="timeDisplay_icon" src={icon} alt="icon" />
        {greeting}
      </p>
      <h3 className="timeDisplay_date">{formattedDate}</h3>
      <h1 className="timeDisplay_clock">{formattedTime}</h1>
      <div className="timeDisplay_box">
        <p className="timeDisplay_city">
          In {city.replace("_", " ")}, {continentAbbreviation}
        </p>
        <button className="button" onClick={toggleExpand}>
          {isExpanded ? "Less" : "More"}
          <img
            className={`button_icon ${isExpanded ? "button_icon_rotated" : ""}`}
            src={arrowIcon}
            alt="arrow_icon"
          />
        </button>
      </div>
    </div>
  );
};

export default TimeDisplay;