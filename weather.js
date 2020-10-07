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

    document.addEventListener("DOMContentLoaded", function(locationSVG) { 
        if (location.textContent === 'Christchurch') {
            locationSVG = document.getElementsByClassName('wellington', 'auckland');
            locationSVG.classList.add('visibly-hidden');
        } if (location.textContent === 'Wellington') {
            locationChristchurch = document.getElementsByClassName('christchurch');
            locationSVG.classList.add('visibly-hidden');
        } else {
            locationSVG = document.getElementsByClassName('wellington', 'christchurch');
            locationSVG.classList.add('visibly-hidden');
        }
    });
    
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
    targets: '.blah',
    translateY: -900,
    duration: 12000,
    loop: false,
    easing: 'easeInOutCubic',
    delay: function(el, i, l) {
        return i * 100;
    },
    endDelay: function(el, i, l) {
        return (l - i) * 100;
    }
});


anime ({
    targets: '#shopiWeather path',
    strokeDashoffset: [anime.strokeDashoffset, 665],
    easing: 'easeInOutCubic',
    duration: '6000',
    loop: false,
    direction: 'alternate'
});

anime ({
    targets: '#location path',
    strokeDashoffset: [anime.strokeDashoffset, 450, 0],
    easing: 'easeInOutCubic',
    duration: '6000',
    delay: '2000',
    loop: false,
    direction: 'normal'
});
