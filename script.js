const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const suggestionsList = document.querySelector("#suggestions-list");
const statusMessage = document.querySelector("#status-message");
const navLocation = document.querySelector("#nav-location");
const cityName = document.querySelector("#city-name");
const regionLine = document.querySelector("#region-line");
const dateLine = document.querySelector("#date-line");
const localTime = document.querySelector("#local-time");
const weatherLabel = document.querySelector("#weather-label");
const conditionIcon = document.querySelector("#condition-icon");
const currentTemp = document.querySelector("#current-temp");
const tempRange = document.querySelector("#temp-range");
const metricGrid = document.querySelector("#metric-grid");
const forecastGrid = document.querySelector("#forecast-grid");
const comparisonList = document.querySelector("#comparison-list");
const newsList = document.querySelector("#news-list");
const weatherVideo = document.querySelector("#weather-video");
const backgroundStage = document.querySelector(".background-stage");

const weatherCodes = {
  0: ["clear", "C\u00e9u limpo", "sun"],
  1: ["clear", "Predominantemente ensolarado", "sun-cloud"],
  2: ["cloudy", "Parcialmente nublado", "cloud"],
  3: ["cloudy", "Nublado", "cloud"],
  45: ["mist", "Neblina", "mist"],
  48: ["mist", "Neblina congelante", "mist"],
  51: ["rain", "Garoa leve", "rain"],
  53: ["rain", "Garoa moderada", "rain"],
  55: ["rain", "Garoa intensa", "rain"],
  56: ["rain", "Garoa congelante", "rain"],
  57: ["rain", "Garoa congelante intensa", "rain"],
  61: ["rain", "Chuva fraca", "rain"],
  63: ["rain", "Chuva moderada", "rain"],
  65: ["rain", "Chuva forte", "rain"],
  66: ["rain", "Chuva congelante", "rain"],
  67: ["rain", "Chuva congelante forte", "rain"],
  71: ["snow", "Neve fraca", "snow"],
  73: ["snow", "Neve moderada", "snow"],
  75: ["snow", "Neve forte", "snow"],
  77: ["snow", "Gr\u00e3os de neve", "snow"],
  80: ["rain", "Pancadas leves", "rain"],
  81: ["rain", "Pancadas moderadas", "rain"],
  82: ["rain", "Pancadas fortes", "rain"],
  85: ["snow", "Pancadas de neve", "snow"],
  86: ["snow", "Pancadas fortes de neve", "snow"],
  95: ["storm", "Trovoadas", "storm"],
  96: ["storm", "Trovoadas com granizo", "storm"],
  99: ["storm", "Trovoadas fortes", "storm"]
};

const iconSvg = {
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>',
  "sun-cloud": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2M5.64 5.64l1.42 1.42M3 12h2M17 5.5A5 5 0 0 0 7.8 9.2"></path><path d="M8 18h9.5a3.5 3.5 0 0 0 .4-6.98 5.5 5.5 0 0 0-10.35 1.5A2.75 2.75 0 0 0 8 18Z"></path></svg>',
  cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 19h11a4.5 4.5 0 0 0 .42-8.98A6.5 6.5 0 0 0 5.7 12.2 3.5 3.5 0 0 0 6.5 19Z"></path></svg>',
  rain: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 15.5h11a4 4 0 0 0 .35-7.98A6 6 0 0 0 6.2 9.4a3 3 0 0 0 .3 6.1Z"></path><path d="M8 18l-1 2M12 18l-1 2M16 18l-1 2"></path></svg>',
  storm: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 15h11a4 4 0 0 0 .35-7.98A6 6 0 0 0 6.2 9.4a3 3 0 0 0 .3 5.6Z"></path><path d="m13 13-3 5h4l-2 4 5-7h-4Z"></path></svg>',
  snow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M5 5l14 14M19 5 5 19M4 12h16"></path></svg>',
  mist: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M2 12h18M5 16h17"></path></svg>',
  wind: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h12a3 3 0 1 0-3-3M4 13h15a2.5 2.5 0 1 1-2.5 2.5M3 18h9"></path></svg>',
  droplet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11Z"></path></svg>',
  gauge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 1 1 16 0"></path><path d="M12 14l4-4"></path><path d="M8 18h8"></path></svg>',
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>'
};

const weatherClasses = ["weather-clear", "weather-cloudy", "weather-rain", "weather-storm", "weather-snow", "weather-mist"];
const videoSources = {
  clear: { day: "", night: "" },
  cloudy: { day: "", night: "" },
  rain: { day: "", night: "" },
  storm: { day: "", night: "" },
  snow: { day: "", night: "" },
  mist: { day: "", night: "" }
};

let debounceTimer;
let activeSuggestion = null;
let currentSuggestions = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = cityInput.value.trim();

  if (!query) {
    setStatus("Digite uma cidade para buscar.", true);
    return;
  }

  hideSuggestions();
  loadWeather(query);
});

cityInput.addEventListener("input", () => {
  const query = cityInput.value.trim();
  activeSuggestion = null;
  clearTimeout(debounceTimer);

  if (query.length < 2) {
    hideSuggestions();
    return;
  }

  debounceTimer = setTimeout(() => loadSuggestions(query), 260);
});

cityInput.addEventListener("keydown", (event) => {
  const items = [...suggestionsList.querySelectorAll(".suggestion-item")];

  if (!items.length) {
    return;
  }

  const currentIndex = Math.max(0, items.findIndex((item) => item.classList.contains("is-active")));

  if (event.key === "ArrowDown") {
    event.preventDefault();
    setActiveSuggestion(items, Math.min(currentIndex + 1, items.length - 1));
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    setActiveSuggestion(items, Math.max(currentIndex - 1, 0));
  }

  if (event.key === "Enter" && activeSuggestion) {
    event.preventDefault();
    selectSuggestion(activeSuggestion);
  }

  if (event.key === "Escape") {
    hideSuggestions();
  }
});

document.addEventListener("click", (event) => {
  if (!form.contains(event.target)) {
    hideSuggestions();
  }
});

loadWeather(cityInput.value);

async function loadWeather(queryOrLocation) {
  try {
    setLoading(true);
    setStatus("Atualizando atmosfera...");

    const location = typeof queryOrLocation === "string" ? await geocodeCity(queryOrLocation, 1).then((items) => items[0]) : queryOrLocation;

    if (!location) {
      throw new Error("Cidade n\u00e3o encontrada. Tente buscar por nome e pa\u00eds.");
    }

    const data = await fetchForecast(location);
    renderWeather(location, data);
    setStatus(`Clima atualizado para ${location.name}.`);
  } catch (error) {
    setStatus(error.message || "N\u00e3o foi poss\u00edvel carregar o clima agora.", true);
  } finally {
    setLoading(false);
  }
}

async function loadSuggestions(query) {
  try {
    const results = await geocodeCity(query, 5);
    renderSuggestions(results);
  } catch {
    hideSuggestions();
  }
}

async function geocodeCity(query, count = 5) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.search = new URLSearchParams({
    name: query,
    count: String(count),
    language: "pt",
    format: "json"
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao consultar a cidade.");
  }

  const data = await response.json();
  return data.results || [];
}

async function fetchForecast(location) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: "auto",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "weather_code",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index",
      "visibility"
    ].join(","),
    hourly: [
      "precipitation_probability",
      "visibility",
      "uv_index"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "wind_speed_10m_max"
    ].join(","),
    forecast_days: "7"
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao consultar a previs\u00e3o.");
  }

  return response.json();
}

function renderWeather(location, data) {
  const current = data.current;
  const daily = data.daily;
  const hourly = data.hourly;
  const codeInfo = describeCode(current.weather_code);
  const isDay = current.is_day === 1;
  const place = buildPlace(location);
  const country = location.country || location.country_code || "";
  const rainChance = daily.precipitation_probability_max[0] ?? 0;
  const currentHourIndex = findCurrentHourIndex(hourly.time, current.time);

  navLocation.textContent = [location.name, country].filter(Boolean).join(", ");
  cityName.textContent = location.name;
  regionLine.textContent = place;
  dateLine.textContent = formatFullDate(current.time, data.timezone);
  localTime.textContent = formatTime(current.time, data.timezone);
  weatherLabel.textContent = codeInfo.label;
  conditionIcon.innerHTML = iconSvg[codeInfo.icon] || iconSvg.cloud;
  currentTemp.textContent = Math.round(current.temperature_2m);
  tempRange.innerHTML = `${Math.round(daily.temperature_2m_min[0])}&deg; / ${Math.round(daily.temperature_2m_max[0])}&deg;`;

  updateScene(codeInfo.scene, isDay);
  updateVideoBackground(codeInfo.scene, isDay);
  renderMetrics({ current, daily, hourly, currentHourIndex, rainChance });
  renderForecast(daily);
  renderComparison(daily, current);
  renderNews(codeInfo, daily, location);
}

function renderSuggestions(results) {
  if (!results.length) {
    hideSuggestions();
    return;
  }

  currentSuggestions = results;
  suggestionsList.innerHTML = results.map((location, index) => `
    <button class="suggestion-item" type="button" role="option" data-index="${index}">
      <strong>${escapeHtml(location.name)}</strong>
      <span>${escapeHtml(buildPlace(location))}</span>
    </button>
  `).join("");

  [...suggestionsList.querySelectorAll(".suggestion-item")].forEach((button, index) => {
    button.addEventListener("click", () => selectSuggestion(results[index]));
  });

  suggestionsList.classList.add("is-open");
  cityInput.setAttribute("aria-expanded", "true");
  activeSuggestion = results[0];
  setActiveSuggestion([...suggestionsList.querySelectorAll(".suggestion-item")], 0);
}

function selectSuggestion(location) {
  cityInput.value = location.name;
  hideSuggestions();
  loadWeather(location);
}

function setActiveSuggestion(items, index) {
  items.forEach((item) => item.classList.remove("is-active"));
  items[index]?.classList.add("is-active");
  activeSuggestion = currentSuggestions[index] || null;
}

function hideSuggestions() {
  suggestionsList.classList.remove("is-open");
  suggestionsList.innerHTML = "";
  cityInput.setAttribute("aria-expanded", "false");
  activeSuggestion = null;
  currentSuggestions = [];
}

function renderMetrics({ current, daily, hourly, currentHourIndex, rainChance }) {
  const uv = current.uv_index ?? hourly.uv_index?.[currentHourIndex] ?? 0;
  const visibilityMeters = current.visibility ?? hourly.visibility?.[currentHourIndex] ?? 0;
  const precipitation = current.rain || current.precipitation || 0;
  const windDirection = current.wind_direction_10m ?? 90;
  const nextRain = nextRainAmount(daily.precipitation_probability_max);
  const rainSeries = hourly.precipitation_probability?.slice(currentHourIndex, currentHourIndex + 5) || [rainChance, rainChance, rainChance, rainChance, rainChance];

  const cards = [
    metricCard("thermo", "Sensa\u00e7\u00e3o t\u00e9rmica", `${Math.round(current.apparent_temperature)}<span class="metric-unit">&deg;</span>`, current.apparent_temperature > current.temperature_2m ? "A sensa\u00e7\u00e3o est\u00e1 acima da temperatura real." : "A sensa\u00e7\u00e3o est\u00e1 pr\u00f3xima da temperatura real.", iconSvg.gauge),
    metricCard("uv", "\u00cdndice UV", `${Math.round(uv)}`, `${uvLevel(uv)}. Use prote\u00e7\u00e3o solar em exposi\u00e7\u00e3o prolongada.`, iconSvg.sun, `<div class="uv-bar" style="clip-path: inset(0 ${Math.max(0, 100 - uv * 9)}% 0 0);"></div>`),
    windCard(current.wind_speed_10m, daily.wind_speed_10m_max[0], windDirection),
    metricCard("humidity", "Umidade", `${Math.round(current.relative_humidity_2m)}<span class="metric-unit">%</span>`, humidityNote(current.relative_humidity_2m), iconSvg.droplet),
    metricCard("pressure", "Press\u00e3o", `${Math.round(current.surface_pressure)}<span class="metric-unit"> hPa</span>`, pressureNote(current.surface_pressure), iconSvg.gauge),
    metricCard("visibility", "Visibilidade", `${formatNumber(visibilityMeters / 1000)}<span class="metric-unit"> km</span>`, visibilityMeters > 8000 ? "Horizonte claro para deslocamentos." : "Aten\u00e7\u00e3o a neblina ou baixa visibilidade.", iconSvg.eye),
    metricCard("chance", "Chance de chuva", `${rainChance}<span class="metric-unit">%</span>`, rainChance > 55 ? "Probabilidade elevada nas pr\u00f3ximas horas." : "Baixa chance de chuva nas pr\u00f3ximas horas.", iconSvg.rain, rainBars(rainSeries)),
    metricCard("precip", "Precipita\u00e7\u00e3o", `${formatNumber(precipitation)}<span class="metric-unit"> mm</span>`, `Pr\u00f3xima previs\u00e3o: ${nextRain}.`, iconSvg.droplet)
  ];

  metricGrid.innerHTML = cards.join("");
}

function metricCard(id, title, value, note, icon, extra = "") {
  return `
    <article class="metric-card" data-metric="${id}">
      <div>
        <div class="metric-title"><span class="metric-icon">${icon}</span>${title}</div>
        <div class="metric-value">${value}</div>
      </div>
      ${extra}
      <p class="metric-note">${note}</p>
    </article>
  `;
}

function windCard(speed, gust, direction) {
  return `
    <article class="metric-card is-wide" data-metric="wind">
      <div class="metric-title"><span class="metric-icon">${iconSvg.wind}</span>Vento</div>
      <div class="wind-visual">
        <div class="wind-lines">
          <p><strong>Vento</strong><span>${Math.round(speed)} km/h</span></p>
          <p><strong>Rajadas</strong><span>${Math.round(gust)} km/h</span></p>
          <p><strong>Dire\u00e7\u00e3o</strong><span>${directionLabel(direction)}</span></p>
        </div>
        <div class="compass" style="--wind-deg: ${direction}deg"><strong>${Math.round(speed)}</strong></div>
      </div>
    </article>
  `;
}

function renderForecast(daily) {
  forecastGrid.innerHTML = daily.time.map((date, index) => {
    const codeInfo = describeCode(daily.weather_code[index]);
    const max = Math.round(daily.temperature_2m_max[index]);
    const min = Math.round(daily.temperature_2m_min[index]);
    const rainChance = daily.precipitation_probability_max[index] ?? 0;

    return `
      <article class="forecast-card">
        <span>${formatDay(date, index)}</span>
        <div class="weather-icon">${iconSvg[codeInfo.icon] || iconSvg.cloud}</div>
        <strong class="range"><span>${min}&deg;</span><span>${max}&deg;</span></strong>
        <p class="condition">${rainChance}% chuva</p>
      </article>
    `;
  }).join("");
}

function renderComparison(daily, current) {
  const todayMax = daily.temperature_2m_max[0];
  const tomorrowMax = daily.temperature_2m_max[1] ?? todayMax;
  const weekMax = Math.max(...daily.temperature_2m_max);
  const weekMin = Math.min(...daily.temperature_2m_min);
  const rainPeak = Math.max(...daily.precipitation_probability_max.filter(Number.isFinite));
  const windPeak = Math.max(...daily.wind_speed_10m_max);

  const items = [
    ["Hoje vs amanh\u00e3", tomorrowMax > todayMax ? "Aquecimento leve" : "Tend\u00eancia est\u00e1vel", `${Math.round(todayMax)}&deg; -> ${Math.round(tomorrowMax)}&deg;`],
    ["Hoje vs semana", "Amplitude prevista para os pr\u00f3ximos 7 dias", `${Math.round(weekMin)}&deg; / ${Math.round(weekMax)}&deg;`],
    ["Cidade A vs Cidade B", "Espa\u00e7o preparado para compara\u00e7\u00e3o entre localidades", "Em breve"],
    ["Press\u00e3o e chuva", `Pico de chuva em ${rainPeak || 0}% e vento em ${Math.round(windPeak)} km/h`, `${Math.round(current.surface_pressure)} hPa`]
  ];

  comparisonList.innerHTML = items.map(([title, copy, value]) => `
    <article class="comparison-item">
      <span>Comparativo</span>
      <strong>${title}</strong>
      <p>${copy}</p>
      <strong>${value}</strong>
    </article>
  `).join("");
}

function renderNews(codeInfo, daily, location) {
  const hottestIndex = daily.temperature_2m_max.indexOf(Math.max(...daily.temperature_2m_max));
  const hottestDay = formatDay(daily.time[hottestIndex], hottestIndex).toLowerCase();
  const rainPeak = Math.max(...daily.precipitation_probability_max.filter(Number.isFinite));

  const cards = [
    {
      title: `${codeInfo.label} em ${location.name}`,
      summary: codeInfo.scene === "rain" || codeInfo.scene === "storm" ? `Radar aponta at\u00e9 ${rainPeak || 0}% de chance de chuva na semana.` : `O dia mais quente tende a ser ${hottestDay}, bom para planejar atividades externas.`,
      date: "Atualizado agora"
    },
    {
      title: "Clima inteligente em breve",
      summary: "A se\u00e7\u00e3o est\u00e1 pronta para receber not\u00edcias reais, alertas locais e resumos gerados por IA.",
      date: "Roadmap Meteora"
    }
  ];

  newsList.innerHTML = cards.map((card) => `
    <article class="news-card">
      <div class="news-image" aria-hidden="true"></div>
      <div class="news-content">
        <h3>${card.title}</h3>
        <p>${card.summary}</p>
        <span class="news-date">${card.date}</span>
      </div>
    </article>
  `).join("");
}

function updateScene(scene, isDay) {
  document.body.classList.remove(...weatherClasses, "day", "night");
  document.body.classList.add(`weather-${scene}`, isDay ? "day" : "night");
}

function updateVideoBackground(scene, isDay) {
  const source = videoSources[scene]?.[isDay ? "day" : "night"];

  if (!source) {
    weatherVideo.removeAttribute("src");
    backgroundStage.classList.remove("has-video");
    return;
  }

  if (weatherVideo.getAttribute("src") !== source) {
    weatherVideo.src = source;
    weatherVideo.play().catch(() => {});
  }

  backgroundStage.classList.add("has-video");
}

function describeCode(code) {
  const [scene, label, icon] = weatherCodes[code] || ["cloudy", "Tempo vari\u00e1vel", "cloud"];
  return { scene, label, icon };
}

function buildPlace(location) {
  return [location.admin1, location.country || location.country_code].filter(Boolean).join(", ");
}

function findCurrentHourIndex(times, currentTime) {
  const index = times?.findIndex((time) => time === currentTime);
  return Math.max(index || 0, 0);
}

function nextRainAmount(chances) {
  const index = chances.findIndex((chance, dayIndex) => dayIndex > 0 && chance > 35);
  return index > 0 ? `${chances[index]}% em ${formatDay(new Date(Date.now() + index * 86400000).toISOString().slice(0, 10), index)}` : "sem destaque nos pr\u00f3ximos dias";
}

function rainBars(values) {
  return `<div class="rain-bars">${values.slice(0, 5).map((value) => `<span style="height: ${Math.max(6, value * 0.42)}px"></span>`).join("")}</div>`;
}

function uvLevel(value) {
  if (value < 3) return "Baixo";
  if (value < 6) return "Moderado";
  if (value < 8) return "Alto";
  return "Muito alto";
}

function humidityNote(value) {
  if (value < 35) return "Ar seco. Hidrate-se com mais frequ\u00eancia.";
  if (value > 75) return "Ar bem \u00famido, com sensa\u00e7\u00e3o mais pesada.";
  return "Umidade em faixa confort\u00e1vel.";
}

function pressureNote(value) {
  if (value < 1000) return "Press\u00e3o mais baixa pode indicar instabilidade.";
  if (value > 1020) return "Press\u00e3o alta sugere tempo mais est\u00e1vel.";
  return "Press\u00e3o dentro de uma faixa comum.";
}

function directionLabel(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return directions[Math.round(degrees / 45) % 8];
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "#ffd1d1" : "";
}

function setLoading(isLoading) {
  document.body.classList.toggle("is-loading", isLoading);
  form.querySelector("button").disabled = isLoading;
}

function formatFullDate(dateString, timezone) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    timeZone: timezone
  }).format(new Date(dateString));
}

function formatTime(dateString, timezone) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone
  }).format(new Date(dateString));
}

function formatDay(dateString, index) {
  if (index === 0) {
    return "Hoje";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit"
  }).format(new Date(`${dateString}T12:00:00`));
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 1
  }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
