

var cityName = document.querySelector("#cityName");
var cityBtn = document.querySelector("#btnSearch");

// var mboxCityName = document.querySelector("#cityNameBmx");
var mboxTemp = document.querySelector("#tempBxm");
var mboxWind = document.querySelector("#windBxm");
var mboxHumid = document.querySelector("#humidBxm");


var dayTemp = document.querySelectorAll(".tempBx");
var dayWind = document.querySelectorAll(".windBx");
var dayHumid = document.querySelectorAll(".humidBx");
var boxDate = document.querySelectorAll(".Bxdate");

var image1 = document.querySelectorAll(".card-img-top");
var mimage =document.querySelector(".mcard-img-top");

var mboxDate = document.querySelector("#dateBmx");
var mboxCityName = document.querySelector("#cityNameBmx");
var searchBtn = document.querySelectorAll(".srhchbtn");



var url = '';
var dataUrl = '';
var filter;
var lat; 
var lon;
var curretnDayTemp;
var curretnDayHumid;
var curretnDayWind;
var getbtnName = [];
var spliTimeArray=[];
var nextDaysArray = [];
var splitDate
var filteredArray = [];

  // location.reload();

//Main Search Button Event
 document.getElementById("btnSearch").addEventListener("click", function() {
    cityName = document.getElementById("cityName").value;
    mboxCityName.textContent = cityName;
    url = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=5&appid=8f85de3f09fd660e685a8dc902867d7f'
    
    var currentdate = new Date();
    
    // var storeCity = [currentdate, cityName]
    
    localStorage.setItem (currentdate, cityName);
    // getbtnName = localStorage.setItem('Cityname', JSON.stringify(storeCity));

    var check = dayTemp.val;
    console.log(check);

    spliTimeArray.length =0;
    nextDaysArray.length =0;

    // clearData ();

    fetchcity(url)
  });
 
function clearData (url) {

  var furl = url;
    for(var z = 0; z < 5; z++){
      
      image1[z].removeAttribute('src');
      // console.log(nurl)
  
     
      dayTemp[z].innerHTML = "";
      dayWind[z].innerHTML = "";
      dayHumid[z].innerHTML =  "";
  
        
      boxDate[z].innerHTML = "";
    }

    fetchcity(furl);
}   

//This function will generate the Finitial url with the CIty to get the Lat and Lot
function cityurlGenerator (cname) {

  var srchcityName = cname;
  // console.log(cname);
  // cityName.innerHTML = "";
  mboxCityName.textContent = cname;
  var srcurl = 'http://api.openweathermap.org/geo/1.0/direct?q='+srchcityName+'&limit=5&appid=799d82f5c4c82842092915991a76091c'
  
  // clearData (srcurl)
  fetchcity(srcurl)
}


function fetchcity (cityurl) { //This Function will get the Lat and Lon

  fetch(cityurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      filter = data[0];
      lat = filter.lat;
      lon = filter.lon;
      // localStorage.setItem (lat, cityName);
      fetchData (lat, lon);
    });

}

function fetchData (lat, lon) {  //This Function will Fetch withthe Lat and Lon

  dataUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=8f85de3f09fd660e685a8dc902867d7f';
   
  

fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
     console.log(data);
    const tempdata = data.list
   
    todaysdata(tempdata);
    fivedaysdata(tempdata); 
     
  });

}

function todaysdata (array) { //Function will display the values of the Todays Forecast box

  const temparray = array;

  console.log(temparray);

  const mimageurl = temparray[0].weather[0].icon;
  const murl = `https://openweathermap.org/img/wn/${mimageurl}@2x.png`;
  mimage.setAttribute('src', murl);

  
  const tmpDate = temparray[0].dt_txt;
  var mboxsplitDate = tmpDate.split(" ")[0];
  mboxDate.textContent = mboxsplitDate;

  const todaystemp = temparray[0].main.temp;
  const value = (todaystemp - 273.15)
  curretnDayTemp = value.toFixed(2);
  // console.log(curretnDayTemp);
  mboxTemp.textContent = curretnDayTemp;


  curretnDayHumid = temparray[0].main.humidity;
  // console.log(curretnDayHumid);
  mboxHumid.textContent = curretnDayHumid;

  curretnDayWind = temparray[0].wind.speed;
  // console.log(curretnDayWind);
  mboxWind.textContent = curretnDayWind;

  

}

 
 

function fivedaysdata (array) {  // This function will split the date and time of the array

  const workingArray = array;
  const today = new Date();
  const day1 = today.setDate(today.getDate() +1);

  const tempDate = workingArray[0].dt_txt;
  splitDate = tempDate.split(" ")[0];

  for(var i=0; i < workingArray.length; i++) {

    const tempDateNew = workingArray[i].dt_txt;
    var checkDate = tempDateNew.split(" ")[0];
   
    if (checkDate >= splitDate) {
   
       nextDaysArray.push(workingArray[i])

    }
    
  }
  fivedayThree (nextDaysArray)

}

// var spliTimeArray = [];

function fivedayThree (array) {  //This function will filter and get an array of the 5 day forecast for 3pm 
 
  console.log(spliTimeArray)
  var threeArray = array;
  console.log(threeArray);
  var splitTime;

  for (var x=0; x < threeArray.length; x++) {

    splitTime = (threeArray[x].dt_txt).split(" ")[1]

    if (splitTime === "15:00:00") {

      spliTimeArray.push(threeArray[x]);

    }

}
console.log(spliTimeArray);

  fill5daydata (spliTimeArray);

}


function fill5daydata (array) { // This function will get and display the values for the 5 day weather forecast boxes

  console.log(array);
  var gettemp;
  var tempwind;
  var temphumid;
  var newbxDate;
  var nmbxDate;
  var temp1;
  var gettemp;
  var tempwind;
  var temphumid;
  
  var fiveDayArray = array;

  var temp1 = fiveDayArray[0].main.temp;
  const tempcheck = (temp1 - 273.15);
  
  temp1 = tempcheck

  for(var z = 0; z < 5; z++){
      
    image1[z].removeAttribute('src');
   

   
    dayTemp[z].innerHTML = "";
    dayWind[z].innerHTML = "";
    dayHumid[z].innerHTML =  "";

      
    boxDate[z].innerHTML = "";
  }
  
  for(var z = 0; z < 5; z++){
    var nimageurl = fiveDayArray[z]?.weather[0]?.icon;
    var nurl = `https://openweathermap.org/img/wn/${nimageurl}@2x.png`;
    image1[z].setAttribute('src', nurl);
    console.log(nurl)

    temp1 = fiveDayArray[z]?.main?.temp;
    gettemp = (temp1 - 273.15);
    gettemp = gettemp.toFixed(2);
    tempwind  = fiveDayArray[z].wind.speed;
    temphumid = fiveDayArray[z].main.humidity;
    console.log(fiveDayArray[z].main.humidity);
  
    dayTemp[z].textContent = gettemp;
    dayWind[z].textContent = tempwind;
    dayHumid[z].textContent = temphumid;

    newbxDate = fiveDayArray[z].dt_txt;
    nmbxDate = newbxDate.split(" ")[0];

    boxDate[z].textContent = nmbxDate;

    searchHistory()
  }

  // spliTimeArray =[];
 
}


function searchHistory() { //This Function will generate the 5 buttons for the most recent 5 city searched information 

  var searchCity = [];

    for (let i = 0; i < 5; i++) {
      const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        searchCity.push(value)
        // searchCity.push(value);
        
      if(key !== null) {
        // searchCity.push(value);
        searchBtn[i].disabled = false;
        searchBtn[i].innerHTML =searchCity[i] ;
      }else if(key === null) {
        searchBtn[i].disabled = true;
        searchBtn[i].innerHTML = "City Name";

      }

    }
    console.log(searchCity)
    
}

searchBtn.forEach(searchBtn => { //This function will detect the click event of the past city search buttons
  searchBtn.addEventListener('click', () => {

    console.log("Click Found")
   
    var buttonName = searchBtn.innerHTML;
    spliTimeArray.length =0;
    nextDaysArray.length =0;

    cityurlGenerator (buttonName);
  });
});

