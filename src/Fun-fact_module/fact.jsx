import React, { useState, useEffect } from "react";
import "../Fun-fact_module/_fact.scss";
import refreshIcon from "../gallery/icons/icon-refresh.svg";

function FunFact() {
  const [fact, setFact] = useState("Ładowanie...");

  const fetchRandomFact = async () => {
    try {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      );
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error("Błąd podczas pobierania faktu:", error);
      setFact("Nie udało się pobrać faktu.");
    }
  };

  useEffect(() => {
    fetchRandomFact();
  }, []);

  return (
    <div className="fact">
      <p id="fact_text">{fact}</p>
      <button onClick={fetchRandomFact} className="fact_button">
        <img className="fact_icon" src={refreshIcon} alt="Refresh" />
      </button>
    </div>
  );
}

export default FunFact;
