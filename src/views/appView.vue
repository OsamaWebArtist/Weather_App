<!--eslint-disable-->

<template>
    <div class="container">

        <div class="head-app">
            <div class="container my-5">

                <div class="find-city float-end d-flex flex-row">
                    <div class="search">
                        <input type="text" placeholder="Enter City Name" v-model="city">
                        <button @click="weatherCity">Search</button>
                    </div>
                    <button @click="getWeather" class="location"><i
                            class="fa-solid fa-location-crosshairs"></i></button>
                </div>

                <div class="city-time float-start">
                    <h1>{{ cityname }}</h1>
                    <p>{{ date.slice(0, 10) }} | {{ date.slice(10) }} | {{ countryName === "Westsahara" ? "Morocco" :
                            countryName === "United States of America" ? "USA" : countryName }}</p>
                </div>

            </div>
        </div>

        <div class="body-app">
            <div class="container">

                <div class="temperature">
                    <span>{{ Math.trunc(temp) }}</span>
                    <div class="apparent">
                        <span> °C | °F</span>
                        <p>{{ day[0].day.condition.text }}</p>
                    </div>
                </div>

                <div class="details-temp">
                    <iframe v-for="icons in Allicons" v-show="curr === icons.day || curr === icons.night"
                        :src="day_Night && icons.day === curr ? icons.icon : icons.Night_icon"></iframe>

                    <div class="all-details">
                        <div><i class="fa-solid fa-temperature-quarter"></i> <span>Feels Like : <span class="space">
                                </span> {{
                            Math.trunc(appearTemp)
                        }}°C</span></div>
                        <div><i class="fa-solid fa-droplet"> </i> <span>Humidity : <span class="space"> </span> {{
                                humidity }}%</span>
                        </div>
                        <div><i class="fa-solid fa-wind"> </i> <span>Wind : <span class="space"> </span> {{
                            Math.trunc(wind_speed) }}
                                Km/h</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="bottom-app">
            <div class="container">
                <div class="days row">

                    <div v-for="oneDay in day" class="day col">
                        <span>{{ daysOfWeek[new Date(oneDay.date).getDay()] }}</span>
                        <img :src="oneDay.day.condition.icon"></img>
                        <span>{{ Math.trunc(oneDay.day.maxtemp_c) }}° - {{ Math.trunc(oneDay.day.mintemp_c) }}°</span>
                        <p>{{ oneDay.day.condition.text }}</p>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<!--eslint-disable-->

<script>
import iconJson from "@/jsonFile/icon.json"

/*eslint-disable*/
export default {
    name: "appView",

    data() {
        return {
            city: "casablanca",
            cityname: "",
            countryName: "",

            date: "",
            temp: "",
            appearTemp: "",
            humidity: "",
            wind_speed: "",

            day: "",
            daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            temp_max: "",
            temp_min: "",

            day_Night: "",

            iconCurrent: "",
            curr: "",

            Allicons: iconJson,
        }
    },
    created() {
        this.weatherCity()
    },
    methods: {

        dayOrNight() {
            if (this.day_Night === 1) {
                document.body.style.backgroundImage = "url(/Weather_App/img/day.b7520a12.jpeg)"
            } else {
                document.body.style.backgroundImage = "url(/Weather_App/img/night.228a55e2.jpeg)"
            }
        },

        getWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        let latitude = position.coords.latitude
                        let longitude = position.coords.longitude

                        fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=65d8cfc573d14007904127hjmb90bfa`)
                            .then(response => response.json())
                            .then(data => {
                                this.city = data.address.city
                                this.weatherCity();
                            })
                            .catch(error => {
                                console.error('There was a problem with the weather request:', error);
                            });
                    }
                )
            }



        },

        weatherCity() {
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ce50e7e00f74065b54113244241603&q=${this.city.toLowerCase()}&days=5&aqi=yes&alerts=yes`)
                .then(response => response.json())
                .then(data => {
                    this.cityname = data.location.name
                    this.countryName = data.location.country
                    this.date = data.location.localtime

                    this.temp = data.current.temp_c
                    this.appearTemp = data.current.feelslike_c
                    this.humidity = data.current.humidity
                    this.wind_speed = data.current.wind_kph

                    this.day = data.forecast.forecastday

                    this.day_Night = data.current.is_day

                    this.iconCurrent = data.current.condition.icon
                    this.curr = data.current.condition.text
                    this.dayOrNight()
                })
                .catch(error => {
                    console.error('There was a problem with the weather request:', error);
                });
        }

    },
    computed: {

    }
}
</script>