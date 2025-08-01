const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static('public'));

//app.use(bodyParser.json());

// // router

app.get('/weather', async  (req, res) => {
  try {
    const response = await axios.get('https://api.meteo.lt/v1/places/rusne/forecasts/long-term');
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Error fetching weather data');
  }
});




app.listen(port, () => {
  console.log(`Orų prognozė klauso ${port} porto.`);
});