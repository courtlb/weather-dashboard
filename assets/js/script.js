var citySearchEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var conditionsContainerEl = document.querySelector("#conditions-container");
var cityHeader = document.getElementById('city-header');

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
        getConditions(cityName);
        
        cityHeader.innerHTML = cityName + " (" + moment().format('l') + ")";


        // clear old content
        cityInputEl.value='';
    } else {
      alert('Please enter a valid city');
    }
  };

var getConditions = function(city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e36fb2ce796485b4932661a9398d1827';

    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displayConditions(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Open Weather');
      });
}

citySearchEl.addEventListener("submit", formSubmitHandler);