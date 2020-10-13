// Ensure we use puppeteer
const puppeteer = require("puppeteer");

// Ensure we have Firebase too
const admin = require("firebase-admin");
const serviceAccount = require("./weatherExtensionServiceAccountKey.json");

//initialize admin SDK using serciceAcountKey
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

(async () => {
    
  const browser = await puppeteer.launch();
  const page = await browser.newPage();



  // now specify the page we want to scrape
  await page.goto(
    "https://www.yr.no/en/forecast/daily-table/2-2192362/New%20Zealand/Canterbury/Christchurch%20City/Christchurch"
  );

  const currentLocation = await page.evaluate(
    () => document.querySelector(".page-header__location-name").textContent.replace(" ", "")
  );
  const currentWeatherIcon = await page.evaluate(
    () => document.querySelector(".symbol").textContent
  );
  const currentTemperature = await page.evaluate(() =>
    document
      .querySelector(".temperature")
      .textContent.replace("Temperature", "")
  );
  const currentFeelsLikeTemperature = await page.evaluate(
    () => document.querySelector(".feels-like-text").textContent
  );
  const currentPrecipitation = await page.evaluate(
    () => document.querySelector(".precipitation").textContent
  );

  const currentWindSpeed = await page.evaluate(
    () => document.querySelector(".wind__value").textContent
  );
  const currentWindDirection = await page.evaluate(() =>
    document.querySelector(".wind .nrk-sr").textContent.substring(6)
  );

  // Write data to Firestore
  function writeCurrentWeather() {
    //return a promise since we'll imitating an API call
    return new Promise(function (resolve, reject) {
      resolve({
        location: currentLocation,
        icon: currentWeatherIcon,
        temperature: currentTemperature,
        feelsLikeTemperature: currentFeelsLikeTemperature,
        precipitation: currentPrecipitation,
        windSpeed: currentWindSpeed,
        windDirection: currentWindDirection
      });
    });
  }
  writeCurrentWeather().then((result) => {
    console.log(result);
    const obj = result;
    const weatherData = {
      location: obj.location,
      icon: obj.icon,
      temperature: obj.temperature,
      feelsLikeTemperature: obj.feelsLikeTemperature,
      precipitation: obj.precipitation,
      windSpeed: obj.windSpeed,
      windDirection: obj.windDirection
    };
    return db
      .collection('currentWeather')
      .doc('Christchurch')
      .set(weatherData)
      .then(() => console.log("Current weather forecast for " + currentLocation + " written to database"));
  });

  await browser.close();
})();
