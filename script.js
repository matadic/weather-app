const query = document.querySelector(".query");
const btn = document.querySelector(".btn");
const rezultati = document.querySelector(".rezultati");
rezultati.classList.remove("nesto2");
const apiRoot =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=hr&q=";
const apiSecund = "&appid=";
const apiKey = "bbf8cf1d7e742112907dc3af11522fa6";

const iconRoot = "http://openweathermap.org/img/wn/";
const iconSize = "@4x.png";

const novaFunkcija = function (e) {
  const data = JSON.parse(e.target.response);

  const unixTime = data.dt;
  const time = new Date(unixTime * 1000); // javascript računa s milisekundama
  const timeDiv = document.createElement("div");
  timeDiv.innerText = time;
  // other option:
  // timeDiv.innerText = data.dt_txt;

  rezultati.appendChild(timeDiv);

  const icon = data.weather[0].icon;
  const iconImg = document.createElement("img");
  iconImg.setAttribute("src", iconRoot + icon + iconSize);
  iconImg.setAttribute("alt", data.weather[0].main);
  rezultati.appendChild(iconImg);

  const descDiv = document.createElement("div");
  descDiv.innerText = data.weather[0].description;
  rezultati.appendChild(descDiv);

  const temp = data.main.temp;
  const tempDiv = document.createElement("div");
  tempDiv.innerText = "Temperatura: " + parseInt(temp) + " °C";
  rezultati.appendChild(tempDiv);

  const humidityDiv = document.createElement("div");
  humidityDiv.innerText = "Vlažnost: " + data.main.humidity + "%";
  rezultati.appendChild(humidityDiv);

  const presDiv = document.createElement("div");
  presDiv.innerText = "Tlak: " + data.main.pressure + " hPa";
  rezultati.appendChild(presDiv);

  rezultati.classList.add("nesto2");
};

const btnFunkcija = function () {
  const grad = query.value;
  console.log(grad);

  const url = apiRoot + grad + apiSecund + apiKey;
  console.log(url);

  rezultati.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = novaFunkcija;

  xhr.send();
};

btn.addEventListener("click", btnFunkcija);
query.addEventListener("keyup", btnFunkcija);
