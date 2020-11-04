window.addEventListener('DOMContentLoaded', (event) => {

    var userLocation = localStorage.getItem('userLocation');

    var today = new Date();
    var currentTime = today.getHours() + ":" + ('0'+today.getMinutes()).slice(-2);

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?${userLocation}&appid=4c11ed1244dbc1786547ab8260ecb9a8&units=metric`;

    async function getWeatherData() {
        const response =  await fetch(apiURL)
        const data = await response.json();

        var location = document.createElement('h2');
        location.className = "current-weather__location";
        location.textContent = data.name;
        document.getElementsByClassName('current-weather__header')[0].appendChild(location);
        
        console.log(`Showing forecast for: ${location.textContent}`);

        try {
            document.getElementById(`${location.textContent}`).removeAttribute('class', 'hidden');
        } catch(err) {
            console.log("No fancy cool SVG to animate for your location. Reach out to @like_the_brothers on Slack if you would like your location added");
        };
        var time = document.createElement('p');
        time.className = "current-weather__time grid-item";
        time.textContent = currentTime;
        document.getElementsByClassName('current-weather__wrapper-time')[0].appendChild(time);

        const icon = document.createElement('div');
        icon.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" +  data.weather[0].icon + "@4x.png\">";
        icon.className = "current-weather__icon grid-item";
        document.getElementsByClassName('current-weather__wrapper-icon')[0].appendChild(icon);

        const temperature = document.createElement('p');
        temperature.innerHTML = Math.round(data.main.temp * 10) / 10 + "° " + "<hr><span class=\"current-weather__temperature-feels-like\">Feels like " +  Math.round(data.main.feels_like * 10) / 10  + "°</span";
        var numberAsInt = parseInt(data.main.temp, 10);
        if (numberAsInt >= 21) {
            temperature.className = "current-weather__temperature grid-item  hot";
        } if(numberAsInt >= 15) {
            temperature.className = "current-weather__temperature grid-item  warm";
        } else {
            temperature.className = "current-weather__temperature grid-item  cold";
        }
        document.getElementsByClassName('current-weather__wrapper-temperature')[0].appendChild(temperature);

        const pressure = document.createElement('p');
        pressure.textContent = "Pressure: " + data.main.pressure + "hPa";
        pressure.className = "current-weather__pressure grid-item";
        document.getElementsByClassName('current-weather__wrapper-pressure')[0].appendChild(pressure);

        const humidity = document.createElement('p');
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        humidity.className = "current-weather__humidity grid-item";
        document.getElementsByClassName('current-weather__wrapper-humidity')[0].appendChild(humidity);

        const windSpeed = document.createElement('p');
        windSpeed.innerHTML = data['wind']['speed'] + "<span class=\"current-weather__wind-unit\">m/s</span>";
        windSpeed.className = "current-weather__wind-speed  grid-item";
        document.getElementsByClassName('current-weather__wrapper-wind-speed')[0].appendChild(windSpeed);

        const windDirection = data['wind']['deg'] + 90;
        document.getElementById("windSVG").setAttribute("style", `transform: rotate(${windDirection}deg)`);
    }

    getWeatherData();
});

// animations


anime ({
    targets: '.circle',
    opacity: [0, 0.06],
    duration: '3000',
    loop: false,
    easing: 'easeInOutCubic',
    delay: 500,
});

anime ({
    targets: '.current-weather .current-weather__wind .current-weather__wind-direction svg polygon',
    strokeDashoffset: [anime.strokeDashoffset, 975, 0],
    easing: 'linear',
    duration: '3000',
    loop: false,
    direction: 'normal'
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
    targets: '#Christchurch path',
    strokeDashoffset: [anime.strokeDashoffset, 450, 0],
    easing: 'easeInOutCubic',
    duration: '6000',
    delay: '2000',
    loop: false,
    direction: 'normal'
});

anime ({
    targets: '#Wellington path',
    strokeDashoffset: [anime.strokeDashoffset, 660, 0],
    easing: 'easeInOutCubic',
    duration: '6000',
    delay: '2000',
    loop: false,
    direction: 'normal'
});

anime ({
    targets: '#Auckland path',
    strokeDashoffset: [anime.strokeDashoffset, 435, 0],
    easing: 'easeInOutCubic',
    duration: '6000',
    delay: '2000',
    loop: false,
    direction: 'normal'
});

anime ({
    targets: '#Dunedin path',
    strokeDashoffset: [anime.strokeDashoffset, 390, 0],
    easing: 'easeInOutCubic',
    duration: '6000',
    delay: '2000',
    loop: false,
    direction: 'normal'
});