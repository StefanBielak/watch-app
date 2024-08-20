const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Enable CORS
app.use(cors());

// Define routes
app.get("/api/timezone", async (req, res) => {
  try {
    const response = await axios.get("http://worldtimeapi.org/api/timezone");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching timezones" });
  }
});

app.get("/api/time/:timezone", async (req, res) => {
  const { timezone } = req.params;
  try {
    const response = await axios.get(
      `http://worldtimeapi.org/api/timezone/${timezone}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching time data" });
  }
});

app.get("/api/weather/:cityName", async (req, res) => {
  const { cityName } = req.params;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=10f343d6cfaa09d25b82e813dd6ca785&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
