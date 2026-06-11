<script setup>
const props = defineProps({ date: Date })
import AreaSelector from './AreaSelector.vue'
import WeatherView from './WeatherView.vue'

import { ref } from 'vue'
import { fetchWeatherApi } from 'openmeteo'

const loading = ref(false)
const city = ref(null)
const weatherData = ref(null)

const formatDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')

  return `${y}-${m}-${d}`
}

// 天気情報の取得
const getWeather = async (coordinates) => {
  loading.value = true
  const params = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["rain", "weather_code", "temperature_2m"],
    models: "jma_seamless",
    start_date: formatDate(props.date),
    end_date: formatDate(props.date),
    timezone: "Asia/Tokyo",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const res = responses[0];

  const hourly = res.hourly();
  const daily = res.daily();

  const data = {
    hourly: {
      rain: hourly.variables(0).valuesArray(),
      weather_code: hourly.variables(1).valuesArray(),
      temperature_2m: hourly.variables(2).valuesArray(),
    },
    daily: {
      weather_code: daily.variables(0).valuesArray(),
      temperature_2m_max: daily.variables(1).valuesArray(),
      temperature_2m_min: daily.variables(2).valuesArray(),
    },
  };

  weatherData.value = data
  loading.value = false
}
</script>

<template>
  <div
    v-if="loading"
    class="loading"
  >
    <div class="spinner" />　
    <p>天気情報を取得中...</p>
  </div>

  <WeatherView
    v-else-if="weatherData"
    :city="city"
    :weather="weatherData"
  />

  <AreaSelector
    v-else
    @city="city = $event"
    @coodinates="getWeather"
  />
  
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid aliceblue;
  border-top-color: lightskyblue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>