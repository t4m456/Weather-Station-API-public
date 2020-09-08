//--------------GLOBAL VARIABLES-----------------------------//
const searchIcon1 = document.querySelector(".search-icon1");
const eyeIcon1 = document.querySelector(".eye-icon1");
const box1ForecastBox = document.querySelector(".box1-forecast-box");

const searchIcon2 = document.querySelector(".search-icon2");
const eyeIcon2 = document.querySelector(".eye-icon2");
const box2ForecastBox = document.querySelector(".box2-forecast-box");

const searchIcon3 = document.querySelector(".search-icon3");
const eyeIcon3 = document.querySelector(".eye-icon3");
const box3ForecastBox = document.querySelector(".box3-forecast-box");


//-------------End of global variables----------------------//

class FirstWeather {

    searchCurrentWeather(){

        searchIcon1.addEventListener("click", () =>{

           this.getWeather().then(showWeather => {

                this.displayWeather(showWeather);

            })


        });
    }

    searchForecastWeather(){
        eyeIcon1.addEventListener("click", () =>{

            this.getForecast().then(showForecast => {
 
                 this.displayForecast(showForecast);
 
             })
 
 
         });


    }

    async getWeather(){
        const searchBox1 = document.getElementById("search-box1").value;
        //console.log(searchBox1)
        const urlForCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox1}&units=metric&appid=9a35c717a8174d8a8aadcb0e9b53f232`;
             
        try {

            let result = await fetch(urlForCurrent);
            let data = await result.json();
            let dataArr = [data];

            //console.log(dataArr);
            

            dataArr = dataArr.map(myData => {
                const cityName = myData.name;
                const country = myData.sys.country;

                //----------Creating server time determination----------//
                let serverTime = myData.dt;
                var serverTimeConv = new Date(serverTime * 1000);
                serverTimeConv = serverTimeConv.toLocaleDateString();


                var timeFetch = new Date(serverTime * 1000);
                var hours = timeFetch.getHours();
                var minutes = timeFetch.getMinutes();

               // console.log(minutes);
                if (minutes < 10){

                  minutes = "0" + minutes;
                }

                //-----------Server time end---------------------------//


                
                var todayFetch = new Date();
                var today = todayFetch.getDay();

                switch (today) {
                    case 0:
                      today = "Vasárnap";
                      break;
                    case 1:
                      today = "Hétfő";
                      break;
                    case 2:
                       today = "Kedd";
                      break;
                    case 3:
                      today = "Szerda";
                      break;
                    case 4:
                      today = "Csütörtök";
                      break;
                    case 5:
                      today = "Péntek";
                      break;
                    case 6:
                      today = "Szombat";
                  };

                const temp = myData.main.temp;               
                const humidity = myData.main.humidity;
                const realFeel = myData.main.feels_like;
                var description = myData.weather[0].description;

                switch (description) {

                  case "clear sky":
                    description = "Tiszta égbolt";
                    break;
                  case "few clouds":
                    description = "Enyhén felhős égbolt";
                    break;
                  case "light rain":
                    description = "Enyhe eső";
                    break;
                  case "broken clouds":
                    description = "Felszakadozó felhőzet";
                    break;
                  case "overcast clouds":
                    description = "Borult égbolt";
                    break;
                  case "scattered clouds":
                    description = "Szétszórt felhőzet";
                    break;
                  case "haze":
                    description = "Köd";
                    break;
                  case "moderate rain":
                    description = "Mérsékelt eső";
                    break;
                  case "heavy intensity rain":
                    description = "Heves eső";
                    break;

                }
               
                  return {cityName, country, serverTimeConv, hours, minutes, today, temp, humidity, realFeel, description};     

            });
           
               
            return dataArr; 
            
          
        }


    
        catch(error) {
            console.log(error);
        }


    }
        displayWeather(currentWeather) {

            currentWeather.forEach(myWeather => {

                document.getElementById("box1-city-name").innerHTML = myWeather.cityName;
                document.getElementById("box1-country").innerHTML = myWeather.country;
                document.getElementById("box1-refresh-date").innerHTML = myWeather.serverTimeConv + " "+ myWeather.today + " " + myWeather.hours + ":" + myWeather.minutes;
                document.getElementById("box1-temp").innerHTML = myWeather.temp;
                document.getElementById("box1-humidity").innerHTML = myWeather.humidity;
                document.getElementById("box1-realfeel").innerHTML = myWeather.realFeel;
                document.getElementById("box1-description").innerHTML = myWeather.description;
                          
            });



            };

        async getForecast() {
        
        const searchBox1 = document.getElementById("search-box1").value;
        const urlForForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBox1}&units=metric&exclude=hourly&appid=9a35c717a8174d8a8aadcb0e9b53f232`;
        
        try {

            let result = await fetch(urlForForecast);
            let data = await result.json();
            let dataArr = [data];

            

            dataArr = dataArr[0].list.map(myData => {
                const forecastDate = myData.dt_txt;
                const timestampDay = myData.dt;
                const forecastTemp = myData.main.temp;
                var forecastDescription = myData.weather[0].description;
                //const forecastDate1 = forecastDate[0].dt_txt;
                
                
                
                
                
//----------------------get the day for FORECAST-------------------//
                var actualDayFetch = new Date(parseFloat(timestampDay * 1000));
               var actualDay = actualDayFetch.getDay();
             
               switch (actualDay) {
                case 0:
                  actualDay = "Vasárnap";
                  break;
                case 1:
                  actualDay = "Hétfő";
                  break;
                case 2:
                  actualDay = "Kedd";
                  break;
                case 3:
                  actualDay = "Szerda";
                  break;
                case 4:
                  actualDay = "Csütörtök";
                  break;
                case 5:
                  actualDay = "Péntek";
                  break;
                case 6:
                  actualDay = "Szombat";
              }

              switch (forecastDescription) {

                case "clear sky":
                  forecastDescription = "Tiszta égbolt";
                  break;
                case "few clouds":
                  forecastDescription = "Enyhén felhős égbolt";
                  break;
                case "light rain":
                  forecastDescription = "Enyhe eső";
                  break;
                case "broken clouds":
                  forecastDescription = "Felszakadozó felhőzet";
                  break;
                case "overcast clouds":
                  forecastDescription = "Borult égbolt";
                  break;
                case "scattered clouds":
                  forecastDescription = "Szétszórt felhőzet";
                  break;
                case "haze":
                  forecastDescription = "Köd";
                    break;
                case "moderate rain":
                  forecastDescription = "Mérsékelt eső";
                    break;
                case "heavy intensity rain":
                  forecastDescription = "Heves eső";
                    break;
              }
              
            
            return{forecastDate, actualDay, forecastTemp, forecastDescription}
            
            });
           
               
            return dataArr; 
            
          
        }

        catch(error) {
            console.log(error);
        }


        }
        displayForecast(forecastWeather){

            let result = '';

          forecastWeather.forEach(myForecast => {
            result += `
               
                
          <h4><span>${myForecast.actualDay}: <span class="data-decor">${myForecast.forecastDate}</span></span> <span>Hőfok: </span><span class="data-decor">${myForecast.forecastTemp} &#8451;</span> <span>${myForecast.forecastDescription}</span></h4>

          `        
        
            });
            box1ForecastBox.innerHTML = result;


        }

};

class SecondWeather {

  searchCurrentWeather(){

      searchIcon2.addEventListener("click", () =>{

         this.getWeather().then(showWeather => {

              this.displayWeather(showWeather);

          })


      });
  }

  searchForecastWeather(){
      eyeIcon2.addEventListener("click", () =>{

          this.getForecast().then(showForecast => {

               this.displayForecast(showForecast);

           })


       });


  }

  async getWeather(){
      const searchBox2 = document.getElementById("search-box2").value;
      //console.log(searchBox1)
      const urlForCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox2}&units=metric&appid=9a35c717a8174d8a8aadcb0e9b53f232`;
           
      try {

          let result = await fetch(urlForCurrent);
          let data = await result.json();
          let dataArr = [data];

          //console.log(dataArr);
          

          dataArr = dataArr.map(myData => {
              const cityName = myData.name;
              const country = myData.sys.country;

              //----------Creating server time determination----------//
              let serverTime = myData.dt;
              var serverTimeConv = new Date(serverTime * 1000);
              serverTimeConv = serverTimeConv.toLocaleDateString();


              var timeFetch = new Date(serverTime * 1000);
              var hours = timeFetch.getHours();
              var minutes = timeFetch.getMinutes();

              if (minutes < 10){

                minutes = "0" + minutes;
              }

              //-----------Server time end---------------------------//


              
              var todayFetch = new Date();
              var today = todayFetch.getDay();

              switch (today) {
                  case 0:
                    today = "Vasárnap";
                    break;
                  case 1:
                    today = "Hétfő";
                    break;
                  case 2:
                     today = "Kedd";
                    break;
                  case 3:
                    today = "Szerda";
                    break;
                  case 4:
                    today = "Csütörtök";
                    break;
                  case 5:
                    today = "Péntek";
                    break;
                  case 6:
                    today = "Szombat";
                };

              const temp = myData.main.temp;               
              const humidity = myData.main.humidity;
              const realFeel = myData.main.feels_like;
              var description = myData.weather[0].description;

              switch (description) {

                case "clear sky":
                  description = "Tiszta égbolt";
                  break;
                case "few clouds":
                  description = "Enyhén felhős égbolt";
                  break;
                case "light rain":
                  description = "Enyhe eső";
                break;
                case "broken clouds":
                  description = "Felszakadozó felhőzet";
                break;
                case "overcast clouds":
                    description = "Borult égbolt";
                  break;
                case "scattered clouds":
                    description = "Szétszórt felhőzet";
                  break;
                case "haze":
                    description = "Köd";
                  break;
                case "moderate rain":
                    description = "Mérsékelt eső";
                  break;
                case "heavy intensity rain":
                    description = "Heves eső";
                  break;

              }
             
                return {cityName, country, serverTimeConv, hours, minutes, today, temp, humidity, realFeel, description};     

          });
         
             
          return dataArr; 
          
        
      }


  
      catch(error) {
          console.log(error);
      }


  }
      displayWeather(currentWeather) {

          currentWeather.forEach(myWeather => {

              document.getElementById("box2-city-name").innerHTML = myWeather.cityName;
              document.getElementById("box2-country").innerHTML = myWeather.country;
              document.getElementById("box2-refresh-date").innerHTML = myWeather.serverTimeConv + " "+ myWeather.today + " " + myWeather.hours + ":" + myWeather.minutes;
              document.getElementById("box2-temp").innerHTML = myWeather.temp;
              document.getElementById("box2-humidity").innerHTML = myWeather.humidity;
              document.getElementById("box2-realfeel").innerHTML = myWeather.realFeel;
              document.getElementById("box2-description").innerHTML = myWeather.description;
                        
          });



          };

      async getForecast() {
      
      const searchBox2 = document.getElementById("search-box2").value;
      const urlForForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBox2}&units=metric&exclude=hourly&appid=9a35c717a8174d8a8aadcb0e9b53f232`;
      
      try {

          let result = await fetch(urlForForecast);
          let data = await result.json();
          let dataArr = [data];

          

          dataArr = dataArr[0].list.map(myData => {
              const forecastDate = myData.dt_txt;
              const timestampDay = myData.dt;
              const forecastTemp = myData.main.temp;
              var forecastDescription = myData.weather[0].description;
              //const forecastDate1 = forecastDate[0].dt_txt;
              
              
              
              
              
//----------------------get the day for FORECAST-------------------//
              var actualDayFetch = new Date(parseFloat(timestampDay * 1000));
             var actualDay = actualDayFetch.getDay();
           
             switch (actualDay) {
              case 0:
                actualDay = "Vasárnap";
                break;
              case 1:
                actualDay = "Hétfő";
                break;
              case 2:
                actualDay = "Kedd";
                break;
              case 3:
                actualDay = "Szerda";
                break;
              case 4:
                actualDay = "Csütörtök";
                break;
              case 5:
                actualDay = "Péntek";
                break;
              case 6:
                actualDay = "Szombat";
            }

            switch (forecastDescription) {

              case "clear sky":
                forecastDescription = "Tiszta égbolt";
                break;
              case "few clouds":
                forecastDescription = "Enyhén felhős égbolt";
                break;
              case "light rain":
                forecastDescription = "Enyhe eső";
                break;
              case "broken clouds":
                forecastDescription = "Felszakadozó felhőzet";
                break;
              case "overcast clouds":
                forecastDescription = "Borult égbolt";
                  break;
              case "scattered clouds":
                forecastDescription = "Szétszórt felhőzet";
                  break;
              case "haze":
                    forecastDescription = "Köd";
                  break;
              case "moderate rain":
                    forecastDescription = "Mérsékelt eső";
                  break;
              case "heavy intensity rain":
                    forecastDescription = "Heves eső";
                  break;
            }
            
          
          return{forecastDate, actualDay, forecastTemp, forecastDescription}
          
          });
         
             
          return dataArr; 
          
        
      }

      catch(error) {
          console.log(error);
      }


      }
      displayForecast(forecastWeather){

          let result = '';

        forecastWeather.forEach(myForecast => {
          result += `
             
              
        <h4><span>${myForecast.actualDay}: <span class="data-decor">${myForecast.forecastDate}</span></span> <span>Hőfok: </span><span class="data-decor">${myForecast.forecastTemp} &#8451;</span> <span>${myForecast.forecastDescription}</span></h4>

        `        
      
          });
          box2ForecastBox.innerHTML = result;


      }

};

class ThirdWeather {

  searchCurrentWeather(){

      searchIcon3.addEventListener("click", () =>{

         this.getWeather().then(showWeather => {

              this.displayWeather(showWeather);

          })


      });
  }

  searchForecastWeather(){
      eyeIcon3.addEventListener("click", () =>{

          this.getForecast().then(showForecast => {

               this.displayForecast(showForecast);

           })


       });


  }

  async getWeather(){
      const searchBox3 = document.getElementById("search-box3").value;
      //console.log(searchBox1)
      const urlForCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox3}&units=metric&appid=9a35c717a8174d8a8aadcb0e9b53f232`;
           
      try {

          let result = await fetch(urlForCurrent);
          let data = await result.json();
          let dataArr = [data];

          //console.log(dataArr);
          

          dataArr = dataArr.map(myData => {
              const cityName = myData.name;
              const country = myData.sys.country;

              //----------Creating server time determination----------//
              let serverTime = myData.dt;
              var serverTimeConv = new Date(serverTime * 1000);
              serverTimeConv = serverTimeConv.toLocaleDateString();


              var timeFetch = new Date(serverTime * 1000);
              var hours = timeFetch.getHours();
              var minutes = timeFetch.getMinutes();

              if (minutes < 10){

                minutes = "0" + minutes;
              }

              //-----------Server time end---------------------------//


              
              var todayFetch = new Date();
              var today = todayFetch.getDay();

              switch (today) {
                  case 0:
                    today = "Vasárnap";
                    break;
                  case 1:
                    today = "Hétfő";
                    break;
                  case 2:
                     today = "Kedd";
                    break;
                  case 3:
                    today = "Szerda";
                    break;
                  case 4:
                    today = "Csütörtök";
                    break;
                  case 5:
                    today = "Péntek";
                    break;
                  case 6:
                    today = "Szombat";
                };

              const temp = myData.main.temp;               
              const humidity = myData.main.humidity;
              const realFeel = myData.main.feels_like;
              var description = myData.weather[0].description;

              switch (description) {

                case "clear sky":
                  description = "Tiszta égbolt";
                  break;
                case "few clouds":
                  description = "Enyhén felhős égbolt";
                  break;
                case "light rain":
                  description = "Enyhe eső";
                break;
                case "broken clouds":
                  description = "Felszakadozó felhőzet";
                break;
                case "overcast clouds":
                    description = "Borult égbolt";
                  break;
                case "scattered clouds":
                    description = "Szétszórt felhőzet";
                  break;
                case "haze":
                    description = "Köd";
                  break;
                case "moderate rain":
                    description = "Mérsékelt eső";
                  break;
                case "heavy intensity rain":
                    description = "Heves eső";
                  break;

              }
             
                return {cityName, country, serverTimeConv, hours, minutes, today, temp, humidity, realFeel, description};     

          });
         
             
          return dataArr; 
          
        
      }


  
      catch(error) {
          console.log(error);
      }


  }
      displayWeather(currentWeather) {

          currentWeather.forEach(myWeather => {

              document.getElementById("box3-city-name").innerHTML = myWeather.cityName;
              document.getElementById("box3-country").innerHTML = myWeather.country;
              document.getElementById("box3-refresh-date").innerHTML = myWeather.serverTimeConv + " "+ myWeather.today + " " + myWeather.hours + ":" + myWeather.minutes;
              document.getElementById("box3-temp").innerHTML = myWeather.temp;
              document.getElementById("box3-humidity").innerHTML = myWeather.humidity;
              document.getElementById("box3-realfeel").innerHTML = myWeather.realFeel;
              document.getElementById("box3-description").innerHTML = myWeather.description;
                        
          });



          };

      async getForecast() {
      
      const searchBox3 = document.getElementById("search-box3").value;
      const urlForForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBox3}&units=metric&exclude=hourly&appid=9a35c717a8174d8a8aadcb0e9b53f232`;
      
      try {

          let result = await fetch(urlForForecast);
          let data = await result.json();
          let dataArr = [data];

          

          dataArr = dataArr[0].list.map(myData => {
              const forecastDate = myData.dt_txt;
              const timestampDay = myData.dt;
              const forecastTemp = myData.main.temp;
              var forecastDescription = myData.weather[0].description;
              //const forecastDate1 = forecastDate[0].dt_txt;
              
              
              
              
              
//----------------------get the day for FORECAST-------------------//
              var actualDayFetch = new Date(parseFloat(timestampDay * 1000));
             var actualDay = actualDayFetch.getDay();
           
             switch (actualDay) {
              case 0:
                actualDay = "Vasárnap";
                break;
              case 1:
                actualDay = "Hétfő";
                break;
              case 2:
                actualDay = "Kedd";
                break;
              case 3:
                actualDay = "Szerda";
                break;
              case 4:
                actualDay = "Csütörtök";
                break;
              case 5:
                actualDay = "Péntek";
                break;
              case 6:
                actualDay = "Szombat";
            }

            switch (forecastDescription) {

              case "clear sky":
                forecastDescription = "Tiszta égbolt";
                break;
              case "few clouds":
                forecastDescription = "Enyhén felhős égbolt";
                break;
              case "light rain":
                forecastDescription = "Enyhe eső";
                break;
              case "broken clouds":
                forecastDescription = "Felszakadozó felhőzet";
                break;
              case "overcast clouds":
                forecastDescription = "Borult égbolt";
                  break;
              case "scattered clouds":
                forecastDescription = "Szétszórt felhőzet";
                  break;
              case "haze":
                forecastDescription = "Köd";
                  break;
              case "moderate rain":
                forecastDescription = "Mérsékelt eső";
                  break;
              case "heavy intensity rain":
                forecastDescription = "Heves eső";
                   break;
            }
            
          
          return{forecastDate, actualDay, forecastTemp, forecastDescription}
          
          });
         
             
          return dataArr; 
          
        
      }

      catch(error) {
          console.log(error);
      }


      }
      displayForecast(forecastWeather){

          let result = '';

        forecastWeather.forEach(myForecast => {
          result += `
             
              
        <h4><span>${myForecast.actualDay}: <span class="data-decor">${myForecast.forecastDate}</span></span> <span>Hőfok: </span><span class="data-decor">${myForecast.forecastTemp} &#8451;</span> <span>${myForecast.forecastDescription}</span></h4>

        `        
      
          });
          box3ForecastBox.innerHTML = result;


      }

};



document.addEventListener("DOMContentLoaded", () => {

    const firstweather = new FirstWeather();
 
     firstweather.searchCurrentWeather();
     firstweather.searchForecastWeather();
 
    const secondWeather = new SecondWeather();

      secondWeather.searchCurrentWeather();
      secondWeather.searchForecastWeather();

    const thirdWeather = new ThirdWeather();

      thirdWeather.searchCurrentWeather();
      thirdWeather.searchForecastWeather();
 });
