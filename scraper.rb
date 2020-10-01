require 'nokogiri'
require 'httparty'
require 'byebug'
require 'json'


def scraper
    url = "https://www.yr.no/en/forecast/daily-table/2-2179537/New%20Zealand/Wellington/Wellington%20City/Wellington"
    unparsed_page = HTTParty.get(url)
    parsed_page = Nokogiri::HTML(unparsed_page)
    weatherForecast = parsed_page.css('div.forecast-page') 
    currentWeather = weatherForecast.css('div.now-hero__slide')
    @currentTime = weatherForecast.css('h3.now-hero__heading').text.gsub("Hour", "")
    @currentWeatherIcon = currentWeather.css('div.symbol').text
    @currentTemperature = currentWeather.css('div.now-hero__next-hour-detail').first.text
    @currentPrecipitation = currentWeather.css('span.precipitation').text.gsub("Precipitation ", "")
    @currentWind = currentWeather.css('span.wind__value').text
    @currentWindDirection = currentWeather.css('div.wind-arrow__arrow-container').text

end

file = File.read('./weather.json')
data_hash = JSON.parse(file)

scraper

data_hash['time'] = @currentTime
data_hash['icon'] = @currentWeatherIcon
data_hash['temperature'] = @currentTemperature
data_hash['precipitation'] = @currentPrecipitation
data_hash['wind']['speed'] = @currentWind
data_hash['wind']['direction'] = @currentWindDirection

File.write('./weather.json', JSON.pretty_generate(data_hash))


