const apikey = "22ece879a876c7d7955ed37f5e767987";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=jaipur";

playAudio('wind.mp3')

async function checkWeather() {

  const response = await fetch(apiUrl + `&appid=${apikey}`);
  console.log("we are fetching data plz wait")
  if (response.status == 404) {
    document.getElementById("weatherid").style.display = "none";
    document.getElementById("whole").style.height = 30 + "vh";
    document.getElementById("error").style.display='block'
    setTimeout(() => {
      reload()
    }, 2000);
    
  } else {
    var data = await response.json();
    document.getElementById("weatherid").style.display = "block";
    document.getElementById("whole").style.height = 80 + "vh";
    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText =
      Math.round(data.main.temp) + "°c";
    document.getElementById("hum").innerText = data.main.humidity + "%";
    document.getElementById("win").innerText = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      document.getElementById("curr").src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      document.getElementById("curr").src = "clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      document.getElementById("curr").src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      document.getElementById("curr").src = "mist.png";
    } else if (data.weather[0].main == "Rain") {
      document.getElementById("curr").src = "rain.png";
    }
  }
}

function updatecity() {
  let Url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  let searchcity = document.getElementById("tobesearch").value;
  Url = Url + searchcity;
  apiUrl = Url;
  checkWeather();
}

function reload(){
  window.location.reload()
}

function playAudio(url) {
  new Audio(url).play();
}
