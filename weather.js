const header = document.querySelector('header');

const body = document.querySelector('section');

var today = new Date();
var currentTime = today.getHours() + ":" + today.getMinutes();

let requestURL = './weather.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    const currentWeather = request.response;
    populateForecast(currentWeather);
}

function populateForecast(jsonObj) {
    var location = document.createElement('h2');
    location.className = "current-weather__location";
    location.textContent = jsonObj['location'];
    document.getElementsByClassName('current-weather__header')[0].appendChild(location);
    
    var time = document.createElement('p');
    time.className = "current-weather__time grid-item";
    time.textContent = currentTime;
    document.getElementsByClassName('current-weather__wrapper-time')[0].appendChild(time);

    const icon = document.createElement('div');
    icon.innerHTML = "<img src=\"./images/" +  jsonObj['icon'] + ".png\"/>";
    icon.className = "current-weather__icon grid-item";
    document.getElementsByClassName('current-weather__wrapper-icon')[0].appendChild(icon);

    const temperature = document.createElement('p');
    temperature.innerHTML = jsonObj['temperature'] + "° " + "<span class=\"current-weather__temperature-feels-like\">" + jsonObj['feels_like'] + "</span";
    var numberAsInt = parseInt(jsonObj['temperature'], 10);
    if (numberAsInt >= 21) {
        temperature.className = "current-weather__temperature grid-item  hot";
    } if(numberAsInt >= 15) {
        temperature.className = "current-weather__temperature grid-item  warm";
    } else {
        temperature.className = "current-weather__temperature grid-item  cold";
    }
    document.getElementsByClassName('current-weather__wrapper-temperature')[0].appendChild(temperature);

    const precipitation = document.createElement('p');
    precipitation.textContent = jsonObj['precipitation'];
    precipitation.className = "current-weather__precipitation grid-item";
    document.getElementsByClassName('current-weather__wrapper-precipitation')[0].appendChild(precipitation);

    const windSpeed = document.createElement('p');
    windSpeed.innerHTML = jsonObj['wind']['speed'] + "<span class=\"current-weather__wind-unit\">m/s</span>";
    windSpeed.className = "current-weather__wind-speed  grid-item";
    document.getElementsByClassName('current-weather__wrapper-wind-speed')[0].appendChild(windSpeed);

    const windDirection = document.createElement('p');
    windDirection.textContent = jsonObj['wind']['direction'];
    windDirection.className = "current-weather__wind-direction grid-item";
    document.getElementsByClassName('current-weather__wrapper-wind-direction')[0].appendChild(windDirection);
    
}


// animations

anime ({
    targets: '.blah1',
    translateY:  -800,
    rotateZ:  360,
    scale: 3,
    duration: 18000,
    loop: true
});

anime ({
    targets: '.blah2',
    translateY:  -800,
    rotateZ:  360,
    scale: 2,
    duration: 16000,
    loop: true
});

anime ({
    targets: '.blah3',
    translateY:  -800,
    rotateZ:  360,
    duration: 20000,
    loop: true
});

anime ({
    targets: '.blah4',
    translateY:  -800,
    rotateZ:  360,
    duration: 22000,
    loop: true
});