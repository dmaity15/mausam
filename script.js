const apiKey = "fd40a0eeaaec398d094472ca57b58ba9";

document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.getElementById("cityInput").value.trim();
  const errorDiv = document.getElementById("error");
  const loader = document.getElementById("loader");
  const card = document.getElementById("weatherCard");

  loader.classList.remove("hidden");
  errorDiv.classList.add("hidden");
  card.classList.add("hidden");

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log(data); // For debugging

    if (res.ok) {
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("condition").textContent = data.weather[0].main;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = data.wind.speed;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      card.classList.remove("hidden");
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    errorDiv.textContent = "⚠️ " + err.message;
    errorDiv.classList.remove("hidden");
  } finally {
    loader.classList.add("hidden");
  }
});
