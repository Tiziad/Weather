const apiKey = 'ENTER YOUR API KEY FROM OPEN WEATHER MAP';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('input');
const searchButton = document.getElementById('button');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const dateElement = document.getElementById('date');
const windElement = document.getElementById('wind');
const weatherIcon = document.getElementById('weather-icon'); // Element for weather icon
const weatherInfo = document.getElementById('weather-info'); // Weather info box
const humidityElement = document.getElementById('humidity');


// Function to display the current date
function displayCurrentDate() {
    const today = new Date(); // Get the current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Date formatting
    const formattedDate = today.toLocaleDateString('en-US', options); // Format in English
    dateElement.textContent = `${formattedDate}`; // Set date text
}

// Call the function to display the current date when the page loads
displayCurrentDate();

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        windElement.textContent = ''; // Clear wind speed before new search
        weatherIcon.style.display = 'none'; // Hide icon before new search
        fetchWeather(location);
    } else {
        alert("Please enter a location.");
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Location not found (status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = `${data.weather[0].description}`;
            humidityElement.textContent = `${data.main.humidity}%`; 
            weatherInfo.style.display = 'block';

            const weatherCondition = data.weather[0].main.toLowerCase(); // Get weather condition
            switch (weatherCondition) {
                case 'clear':
                case 'clear sky':
                    weatherIcon.src = 'sunny.png'; // Path to the sun icon
                    weatherIcon.style.display = 'block'; // Show sun icon
                    break;
                case 'clouds':
                case 'overcast':
                case 'cloudy':
                    weatherIcon.src = 'cloudy.png'; // Path to the cloud icon
                    weatherIcon.style.display = 'block'; // Show cloud icon
                    break;
                case 'rain':
                case 'light rain':
                    weatherIcon.src = 'rain.png'; // Path to the rain icon
                    weatherIcon.style.display = 'block'; // Show rain icon
                    break;
                case 'snow':
                    weatherIcon.src = 'snow.png'; // Path to the snow icon
                    weatherIcon.style.display = 'block'; // Show snow icon
                    break;
                default:
                    weatherIcon.style.display = 'none'; // Hide icon for other conditions
                    break;
            }

            const windSpeed = data.wind.speed; // Get wind speed
            windElement.textContent = `${windSpeed} m/s`; // Set wind speed text
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Location not found';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            windElement.textContent = '';
            weatherIcon.style.display = 'none'; // Hide icon on error
            
            // Optionally show an alert or message for errors
            alert("Unable to find the location. Please try again.");
        });
}
