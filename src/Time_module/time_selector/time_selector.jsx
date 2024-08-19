import React, { useState } from "react";
import "../time_selector/_time_selector.scss";
import selectIcon from "../../gallery/icons/icons_search.svg";

const TimezoneSelector = ({ timezones, selectedTimezone, onChange }) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleButtonClick = () => {
    setShowSelector(true);
  };

  const handleChange = (event) => {
    onChange(event);
    setShowSelector(false);
  };

  return (
    <div className="selector">
      {!showSelector && (
        <button className="selector_button" onClick={handleButtonClick}>
          Search your city
          <img
            className="selector_button_icon"
            src={selectIcon}
            alt="select_icon"
          />
        </button>
      )}
      {showSelector && (
        <select
          className={`selector_form ${showSelector ? "show" : ""}`}
          onChange={handleChange}
          value={selectedTimezone}
        >
          {timezones.length > 0 ? (
            timezones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))
          ) : (
            <option>Loading timezones...</option>
          )}
        </select>
      )}
    </div>
  );
};

export default TimezoneSelector;
