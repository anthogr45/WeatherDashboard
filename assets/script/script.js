

var cityName = document.querySelector("#cityName");
var cityBtn = document.querySelector("#btnSearch");

var mboxCityName = document.querySelector("#cityNameBmx");
var mboxTemp = document.querySelector("#tempBxm");
var mboxWind = document.querySelector("#windBxm");
var mboxHumid = document.querySelector("#humidBxm");

var day1Temp = document.querySelector("#tempBx1");
var day1Wind = document.querySelector("#windBx1");
var day1Humid = document.querySelector("#humidBx1");

var day2Temp = document.querySelector("#tempBx2");
var day2Wind = document.querySelector("#windBx2");
var day2Humid = document.querySelector("#humidBx2");

var day2Temp = document.querySelector("#tempBx2");
var day2Wind = document.querySelector("#windBx2");
var day2Humid = document.querySelector("#humidBx2");

var day3Temp = document.querySelector("#tempBx3");
var day3Wind = document.querySelector("#windBx3");
var day3Humid = document.querySelector("#humidBx3");

var day4Temp = document.querySelector("#tempBx4");
var day4Wind = document.querySelector("#windBx4");
var day4Humid = document.querySelector("#humidBx4");

var day5Temp = document.querySelector("#tempBx5");
var day5Wind = document.querySelector("#windBx5");
var day5Humid = document.querySelector("#humidBx5");


// console.log()

var url = '';
var dataUrl = '';
var filter;
var lat; 
var lon;
var curretnDayTemp;
var curretnDayHumid;
var curretnDayWind;


document.getElementById("btnSearch").addEventListener("click", function() {
  cityName = document.getElementById("cityName").value;

  url = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=5&appid=8f85de3f09fd660e685a8dc902867d7f'
  console.log(url);
  fetchcity(url)
});


function fetchcity (cityurl) {

  fetch(cityurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      filter = data[0];
      // const obj = JSON.parse(data);
      // console.log("lat"+filter.lat);
      // console.log("lon"+filter.lon);

      lat = filter.lat;
      lon = filter.lon;
      console.log("lat"+lat);
      console.log("lon"+lon);
      fetchData (lat, lon);
    });

    // dataUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=8f85de3f09fd660e685a8dc902867d7f';
    
    // console.log(dataUrl);
}

function fetchData (lat, lon) {

  dataUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=8f85de3f09fd660e685a8dc902867d7f';
   
  

fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    const tempdata = data.list
    // console.log(tempdata);
    // console.log(tempdata[1].wind);

    // const today = new Date();
    // console.log(today);

    todaysdata(tempdata);

     
  });

}

function todaysdata (array) {

  const temparray = array;

  // console.log(temparray);

  const todaystemp = temparray[0].main.temp;
  const value = (todaystemp - 273.15)
  curretnDayTemp = value.toFixed(2);
  console.log(curretnDayTemp);
  mboxTemp.textContent = curretnDayTemp;


  curretnDayHumid = temparray[0].main.humidity;
  console.log(curretnDayHumid);
  mboxHumid.textContent = curretnDayHumid;

  curretnDayWind = temparray[0].wind.speed;
  console.log(curretnDayWind);
  mboxWind.textContent = curretnDayWind;

}


function fivedaysdata (array) {

  
}