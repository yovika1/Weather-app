      const apiKey = '717b1d8fd3b8015148f883777da5ba8a';

      const searchBtn = document.getElementById('searchBtn');
      const locationInput = document.getElementById('locationInput');
      const weatherOutput = document.getElementById('weatherOutput');

      // Fetch Weather Function
      async function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        try {
          weatherOutput.innerHTML = '<p>Loading...</p>';
          const response = await fetch(url);
          const data = await response.json();

          if (data.cod === 200) {
            displayWeather(data);
          } else {
            weatherOutput.innerHTML = `<p>${data.message}</p>`;
          }
        } catch (error) {
          weatherOutput.innerHTML = `<p>Unable to fetch weather. Please try again!</p>`;
        }
      }

      function displayWeather(data) {
        const { name, sys, main, weather, wind } = data;

        weatherOutput.innerHTML = `
          <h2 class="text-xl font-bold">Weather in ${name}, ${
          sys.country
        }</h2>
          <p class="text-3xl font-semibold mt-2">${main.temp}°C</p>
          <p class="mt-1">☁️ ${weather[0].description}</p>
          <p class="mt-1">Humidity: ${main.humidity}%</p>
          <p class="mt-1">Wind speed: ${wind.speed} km/h</p>
        `;
      }

      searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
          fetchWeather(location);
        } else {
          alert('Please enter a valid city name');
        }
      });
