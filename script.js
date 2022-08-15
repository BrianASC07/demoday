//api link and key
const BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";
const API_KEY = "86b45f687ae884df5bd00b293094f375";
let limit = 1
let userInput = 'New York'

// example data http://api.openweathermap.org/geo/1.0/direct?q=New%20York&limit=1&appid=86b45f687ae884df5bd00b293094f375


let requestURL = `${BASE_URL}?q=${userInput}&limit=${limit}&appid=${API_KEY}`



function displayText(data) {
    let textObject = data.name[0];
   console.log(textObject);
}

fetch(requestURL) // ok data works
    // gets api data
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.log("Error during fetch:", error);
    });


