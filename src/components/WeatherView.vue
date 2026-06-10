<script setup>
import sunny from '@/assets/tenki_mark01_hare.png'
import cloudy from '@/assets/tenki_mark05_kumori.png'
import rainy from '@/assets/tenki_mark03_gouu.png'
import snowy from '@/assets/tenki_mark08_yuki.png'
import cloudyRain from '@/assets/tenki_mark06_kumoriame.png'
import thunder from '@/assets/tenki_mark07_kaminari.png'

const props = defineProps({ city: String, weather: Object })
const weather = props.weather

// 天気情報の定義
const weatherInfo = {
  0: { text: '快晴', icon: sunny },

  1: { text: '晴れ', icon: sunny },
  2: { text: '一部曇り', icon: sunny },
  3: { text: '曇り', icon: cloudy },

  45: { text: '霧', icon: cloudy },
  48: { text: '着氷性の霧', icon: snowy },

  51: { text: '弱い霧雨', icon: cloudyRain },
  53: { text: '霧雨', icon: cloudyRain },
  55: { text: '強い霧雨', icon: cloudyRain },

  56: { text: '弱い着氷性霧雨', icon: cloudyRain },
  57: { text: '強い着氷性霧雨', icon: cloudyRain },

  61: { text: '小雨', icon: rainy },
  63: { text: '雨', icon: rainy },
  65: { text: '大雨', icon: rainy },

  66: { text: '弱い着氷性雨', icon: cloudyRain },
  67: { text: '強い着氷性雨', icon: cloudyRain },

  71: { text: '小雪', icon: snowy },
  73: { text: '雪', icon: snowy },
  75: { text: '大雪', icon: snowy },

  77: { text: '霧雪', icon: snowy },

  80: { text: '弱いにわか雨', icon: rainy },
  81: { text: 'にわか雨', icon: rainy },
  82: { text: '激しいにわか雨', icon: rainy },

  85: { text: '弱いにわか雪', icon: snowy },
  86: { text: '強いにわか雪', icon: snowy },

  95: { text: '雷雨', icon: thunder },

  96: { text: '雷雨（ひょう）', icon: thunder },
  99: { text: '激しい雷雨（ひょう）', icon: thunder }
}

const hourlyWeather = Object.keys(weather.hourly.temperature_2m).map((hour) => ({
  hour,
  temp: Math.round(weather.hourly.temperature_2m[hour]),
  rain: weather.hourly.rain[hour],
  weatherCode: weather.hourly.weather_code[hour],
  weather: weatherInfo[weather.hourly.weather_code[hour]] || {
    text: '不明',
    icon: '/weather/unknown.png'
  }
}))
</script>

<template>
  <div class="city">{{ props.city }}</div>
  <div class="today">
    <div class="title">今日の天気</div>
    <div class="today-detail">
      <div class="today-weather">
        <img
          :src="weatherInfo[weather.daily.weather_code[0]].icon"
          :alt="weatherInfo[weather.daily.weather_code[0]].text"
          class="today-weather-icon"
        >
        <span>　{{ weatherInfo[weather.daily.weather_code[0]].text }}</span>
      </div>
      <div class="today-temp">
        <span>最高気温: <span class="red">{{ Math.round(weather.daily.temperature_2m_max[0]) }}</span>℃</span>
        <br>
        <span>最低気温: <span class="blue">{{ Math.round(weather.daily.temperature_2m_min[0]) }}</span>℃</span>
      </div>
    </div>
  </div>
  <div class="hourly">
    <div class="title">一時間ごとの天気</div>
    <div class="hourly-container">
      <div
        v-for="item in hourlyWeather"
        :key="item.hour"
        class="hour-card"
      >
        <div class="hour">
          {{ item.hour }}:00
        </div>

        <img
          :src="item.weather.icon"
          :alt="item.weather.text"
          class="weather-icon"
        >
        <div class="weather-text">{{ item.weather.text }}</div>

        <div class="temp">
          {{ item.temp }}℃
        </div>

        <div class="rain">
          ☔ {{ item.rain.toFixed(1) }}mm
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.city {
  padding: 0.3rem 1rem;
  margin-bottom: 0.3rem;
  color: #fff;
  border-radius: 100vh;
  background-image: -webkit-gradient(linear, right top, left top, from(#99def7), to(#2739dd));
  background-image: -webkit-linear-gradient(right, #99def7 0%, #2739dd 100%);
  background-image: linear-gradient(to left, #99def7 0%, #2739dd 100%);
}

.today {
  display: flex;
  flex-direction: column;
  padding: 0 0.3rem;
}

.title {
  font-size: 0.8rem;
  font-weight: bold;
  color: midnightblue;

  padding: 0.2rem 1rem;
  border-top: 2px dashed #2739dd;
  border-bottom: 2px dashed #2739dd;
}

.today-detail {
  display: flex;
  flex-direction: row;
}

.today-weather {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
  width: 60%;
}

.today-weather-icon {
  width: 3.5rem;
  height: 3.5rem;
}

.today-temp {
  font-size: 0.9rem;
  align-content: center;
  width: 40%;
}

.red {
  color: red;
}

.blue {
  color: blue;
}

.hourly {
  padding: 0 0.5rem;
}

.hourly-container {
  display: flex;
  gap: 1em;
  overflow-x: auto;
  padding: 0.5em 0.3em;

  scrollbar-width: none;
}

.hour-card {
  flex: 0 0 6em;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.5em 0.5em;
  border-radius: 1em;

  background: white;
  box-shadow: 0 2px 6px rgb(0 0 0 / 10%);
}

.hour {
  font-size: 0.6em;
  font-weight: bold;
}

.weather-icon {
  width: 3em;
  height: 3em;
  margin: 0.3em 0;
}

.weather-text {
  font-size: 0.8em;
}

.temp {
  font-size: 0.8em;
  font-weight: bold;
}

.rain {
  margin-top: 0.2em;
  font-size: 0.6em;
  color: #666;
}
</style>