let searchInp = document.querySelector(".searchInp");
let searchBtn = document.querySelector(".searchBtn");
let locationName = document.querySelector(".locationName");
let temperature = document.querySelector(".temperature");
let weather = document.querySelector(".weather");
let weatcherCont = document.querySelector(".weatcherCont");
let errordiv = document.querySelector(".errordiv");
let succesDiv = document.querySelector(".succesDiv");
let infoConts = document.querySelectorAll(".infoCont");

// put every background image here by the weather
let weatherImg = document.querySelector(".weatherImg");
////

// disable search btn
searchBtn.setAttribute("disabled", "disabled");
//////

async function getWeather(city) {
  try {
    // get weather data
    let getdata = await fetch(
      ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f676040ac4d3168576c5033048502d4&units=metric`
    );
    let data = await getdata.json();
    // //

    // trow the error
    if (data.message === "city not found" || data.cod === "404") {
      throw new Error(
        data.cod +
          " " +
          data.message +
          " " +
          '<i class="fa-solid fa-face-sad-tear"></i> '
      );
    }
    //////

    // appear background images and icons by the weather
    switch (data.weather[0].main) {
      case "Clouds":
        weather.innerHTML = '<i class="fa-solid fa-cloud"></i>';
        weatherImg.src = "./img/clouds.jpeg";
        weatherImg.alt = "cloud img";
        weatherImg.style.display = "block";
        break;
      case "Clear":
        weather.innerHTML = '<i class="fa-solid fa-sun"></i>';
        weatherImg.src = "./img/clear.jpeg";
        weatherImg.alt = "sun img";
        weatherImg.style.display = "block";
        break;
      case "Rain":
        weather.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
        weatherImg.src = "./img/rain.jpeg";
        weatherImg.alt = "rain img";
        weatherImg.style.display = "block";
        break;
      case "Snow":
        weather.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
        weatherImg.src = "./img/snow.jpeg";
        weatherImg.alt = "snow img";
        weatherImg.style.display = "block";
        break;
      case "Fog":
        weather.innerHTML = '<i class="fa-solid fa-smog"></i>';
        weatherImg.src = "./img/fog.jpeg";
        weatherImg.alt = "fog img";
        weatherImg.style.display = "block";
        break;
      case "Thunderstorms":
        weather.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
        weatherImg.src = "./img/Thunderstorms.jpeg";
        weatherImg.alt = "Thunderstorms img";
        weatherImg.style.display = "block";
        break;
    }
    //////

    // appear location name and temperature in document
    locationName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    // ////

    // error div hide
    errordiv.style.display = "none";
    ////
    // succes div appear
    succesDiv.style.display = "block";
  } catch (error) {
    // error div appear
    errordiv.innerHTML = error;
    errordiv.style.display = "block";
    /////

    //  success div hide
    succesDiv.style.display = "none";
    /////
  }
}

searchBtn.addEventListener("click", function () {
  // call the async function
  getWeather(searchInp.value);
  /////

  // appear weatherContainer
  weatcherCont.style.height = "122px";
  /////

  // info animation add
  infoConts.forEach((infoCont) => infoCont.classList.add("infoContActive"));
  //////
});

searchInp.addEventListener("keyup", function () {
  if (searchInp.value < 1) {
    // hide  background image
    weatherImg.style.display = "none";
    ////
    // info animation remove
    infoConts.forEach((infoCont) =>
      infoCont.classList.remove("infoContActive")
    );
    //////

    // hide weatherContainer
    weatcherCont.style.height = "0px";
    ///////

    // disable the search btn
    searchBtn.setAttribute("disabled", "disabled");
    /////
    return;
  }
  //  Enable the search btn
  searchBtn.removeAttribute("disabled", "disabled");
  /////
});
