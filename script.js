//api link and key
const BASE_URL1 = "http://api.openweathermap.org/geo/1.0/direct";
const BASE_URL2 = "http://api.openweathermap.org/data/2.5/air_pollution?";
const API_KEY = "86b45f687ae884df5bd00b293094f375";
let limit = 1;

//html elements
let input = document.querySelector('input');
let button = document.getElementById('enter');
let output1 = document.getElementById('output1');
let output2 = document.getElementById('output2');
let output3 = document.getElementById('output3');
let output4 = document.getElementById('output4');
let output5 = document.getElementById('output5');
let output6 = document.getElementById('output6');
let output7 = document.getElementById('output7');
let output8 = document.getElementById('output8');

//api 1 variables
let userInput = '';
let latitude = '';
let longitude = '';
let cityName = '';

//api 2 variables
let aqi = '';
let nitrogendioxide = '';
let ozone = '';
let carbonmonoxide = '';
let nitrogenmonoxide = '';
let sulpherdioxide = '';
let ammonia = '';


// API #1: Converts the user inputted city into coordinates and stores them as variables
button.onclick = function (event) {
    event.preventDefault()
    userInput = input.value
    let requestURL1 = `${BASE_URL1}?q=${userInput}&limit=${limit}&appid=${API_KEY}`

    fetch(requestURL1)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            cityName = data[0].name;
            latitude = data[0].lat;
            longitude = data[0].lon;
            output1.innerHTML = cityName
            getAirData();
        })

        .catch(function (error) {
            console.log("Error during fetch:", error);
        });
}

// API #2 = Uses the coordinates from the first api to get the air quality data from the second api
function getAirData() {

    let requestURL2 = `${BASE_URL2}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(requestURL2)

        .then(function (response) {
            return response.json();
        })

        .then(webResponse)

        .catch(function (error) {
            console.log("Error during fetch:", error);
        });
}

// Function tells what the website should do with the data 
// also website styling
function webResponse(data) {
    console.log(data)

    aqi = data.list[0].main.aqi;
    nitrogenmonoxide = data.list[0].components.no;
    nitrogendioxide = data.list[0].components.no2;
    carbonmonoxide = data.list[0].components.co;
    ozone = data.list[0].components.o3;
    sulpherdioxide = data.list[0].components.so2;
    ammonia = data.list[0].components.nh3;

    output2.innerHTML = 'Air Quality Index: ' + aqi;
    output3.innerHTML = 'Nitrogen Monoxide Levels: ' + nitrogenmonoxide;
    output4.innerHTML = 'Nitrogen Dioxide Levels: ' + nitrogendioxide;
    output5.innerHTML = 'Carbon Monoxide Levels: ' + carbonmonoxide;
    output6.innerHTML = 'Sulpher Dioxide Levels: ' + sulpherdioxide;
    output7.innerHTML = 'Ammonia Levels: ' + ammonia;
    output8.innerHTML = 'Ozone Levels: ' + ozone;

    if (aqi == 1 || aqi == 2) {
        output2.style.color = 'green';
    }
    if (aqi == 3) {
        aqi.style.color = 'yellow';
    }

    if (aqi == 4 || aqi == 5) {
        aqi.style.color = 'red';
    }
}
