//mapboxgl accesstoken
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaWFubmFsYmVyIiwiYSI6ImNsNGp6MjlvdTA5eTMzZW8xbWl4cmtpM2QifQ.fb8kLXjBKLtFrCuTFtIgLA";

// create marker icon
const marker_icon = document.querySelector(".icon");
marker_icon.style.backgroundImage =
  "url('https://cdn3.iconfinder.com/data/icons/planets-1/512/Mars-256.png')";
marker_icon.style.backgroundSize = "100%";
marker_icon.style.width = "2em";
marker_icon.style.height = "2em";

//show weather
const weather = {
    "api_key": "626e562e5d943f02cebe768f66e2606d",
  fetch_weather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.api_key)
      .then(response => response.json())
      .then(data => this.show_weather(data));
  },
  show_weather: function (data) {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText =
      "Today in " + name + " will be " + description + ".";
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".wind_speed").innerText = "Wind speed: " + speed + " mph";

    //show lon and lat on map according to the search results
    const map = new mapboxgl.Map({
      container: "map",
      center: [data.coord.lon, data.coord.lat],
      style: "mapbox://styles/mariannalber/cl4la019k002p14qskjpbvoc6",
      zoom: 8,
    });
    //show marker icon for lon and lat on map according to the search results
    const landingSpot = new mapboxgl.Popup().setHTML('<h4>Best landing spot</h4>');
    new mapboxgl.Marker(marker_icon).setLngLat([data.coord.lon, data.coord.lat]).setPopup(landingSpot).addTo(map);
  },
  //show weather data
  search: function () {
    this.fetch_weather(document.querySelector(".search_bar").value);
  },
};

//search button on click
document.querySelector(".search_button").addEventListener("click", function () {
  weather.search();
});

//default weather is Florida
weather.fetch_weather("Florida");
