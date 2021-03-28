var citySearchEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];
var conditionsContainerEl = document.querySelector("#conditions-container");
var cityHeader = document.getElementById('city-header');

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    cityName = cityInputEl.value.trim();
  
    if (cityName) {
        getConditions(cityName);
        getForecast(cityName);
        
        // clear old content
        cityInputEl.value='';
    } else {
      alert('Please enter a valid city');
    }

    saveSearch(cityName);
  };

var saveSearch = function(city) {
  cityArray.push(city);
  localStorage.setItem("cityArray", JSON.stringify(cityArray));
};  



var getConditions = function(city) {
    var currentApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e36fb2ce796485b4932661a9398d1827';

    // make a get request to url
    fetch(currentApiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(currentData) {
            console.log(currentData);
            displayConditions(currentData);

            //nested API call to access uv index
            var onecallApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ currentData.coord.lat+'&lon='+currentData.coord.lon+'&appid=e36fb2ce796485b4932661a9398d1827';
            fetch(onecallApiUrl)
            .then(function(response) {
              // request was successful
              if (response.ok) {
                console.log(response);
                response.json().then(function(onecallData) {
                  console.log(onecallData);
                  displayUV(onecallData);
                  //displayUV(onecallData);
                });
        }
      });
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Open Weather');
      });
}

var displayConditions = function(cityData) {
    cityHeader.innerHTML = cityData.name + " (" + moment().format('l') + ")" + "<img src=http://openweathermap.org/img/wn/" + cityData.weather[0].icon + ".png></img>"

    var tempEl = document.getElementById('temp')
    tempEl.innerHTML = "Temperature: " + cityData.main.temp + " °F"

    var humidEl = document.getElementById('humid')
    humidEl.innerHTML = "Humidity: " + cityData.main.humidity + "%"

    var windEl = document.getElementById('wind')
    windEl.innerHTML = "Wind Speed: " + cityData.wind.speed + " MPH"
}

var displayUV = function(onecallData) {
  var uvEl = document.getElementById('uv');
  var uvText = onecallData.daily[0].uvi;
  uvEl.innerHTML = "UV Index: " + uvText;

  if(uvText <= 3) {
    $(uvEl).addClass("uv-favorable");
  } else if(3 < uvText< 8) {
    $(uvEl).addClass("uv-moderate");
  } else {
    $(uvEl).addClass("uv-severe");
  }
}
 

var getForecast = function(city) {
    var forecastApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid=e36fb2ce796485b4932661a9398d1827';

    // make a get request to url
    fetch(forecastApiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(forecastData) {
            console.log(forecastData);
            displayForecast(forecastData);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Open Weather');
      });
}

var displayForecast = function(forecastData) {
    var day1El = document.getElementById('day1');
    $(day1El).addClass('bg-primary card text-light forecast-card');
    day1El.innerHTML = 
        "<h4>" + moment().add(1, 'days').format('l')+ "</h4>" +
        "<img src=http://openweathermap.org/img/wn/" + forecastData.list[6].weather[0].icon + ".png></img>" +
        "<p>Temp: " + forecastData.list[6].main.temp + " °F</p>" +
        "<p>Humidity: " + forecastData.list[6].main.humidity + "%</p>"

    var day2El = document.getElementById('day2');
    $(day2El).addClass('bg-primary card text-light forecast-card');
    day2El.innerHTML = 
        "<h4>" + moment().add(2, 'days').format('l')+ "</h4>" +
        "<img src=http://openweathermap.org/img/wn/" + forecastData.list[14].weather[0].icon + ".png></img>" +
        "<p>Temp: " + forecastData.list[14].main.temp + " °F</p>" +
        "<p>Humidity: " + forecastData.list[14].main.humidity + "%</p>"

    var day3El = document.getElementById('day3');
    $(day3El).addClass('bg-primary card text-light forecast-card');
    day3El.innerHTML = 
        "<h4>" + moment().add(3, 'days').format('l')+ "</h4>" +
        "<img src=http://openweathermap.org/img/wn/" + forecastData.list[22].weather[0].icon + ".png></img>" +
        "<p>Temp: " + forecastData.list[22].main.temp + " °F</p>" +
        "<p>Humidity: " + forecastData.list[22].main.humidity + "%</p>"

    var day4El = document.getElementById('day4');
    $(day4El).addClass('bg-primary card text-light forecast-card');
    day4El.innerHTML = 
        "<h4>" + moment().add(4, 'days').format('l')+ "</h4>" +
        "<img src=http://openweathermap.org/img/wn/" + forecastData.list[30].weather[0].icon + ".png></img>" +
        "<p>Temp: " + forecastData.list[30].main.temp + " °F</p>" +
        "<p>Humidity: " + forecastData.list[30].main.humidity + "%</p>"      

    var day5El = document.getElementById('day5');
    $(day5El).addClass('bg-primary card text-light forecast-card');
    day5El.innerHTML = 
        "<h4>" + moment().add(5, 'days').format('l')+ "</h4>" +
        "<img src=http://openweathermap.org/img/wn/" + forecastData.list[38].weather[0].icon + ".png></img>" +
        "<p>Temp: " + forecastData.list[38].main.temp + " °F</p>" +
        "<p>Humidity: " + forecastData.list[38].main.humidity + "%</p>"        
}

citySearchEl.addEventListener("submit", formSubmitHandler);