<script setup>
const emit = defineEmits(['coodinates'])

import { ref, onMounted } from 'vue'

// 市区町村の選択
const prefectures = ref([])
const cities = ref([])

const selectedPref = ref('')
const selectedCity = ref('')

onMounted(async () => {
  const res = await fetch('https://geoapi.heartrails.com/api/json?method=getPrefectures')
  const data = await res.json()
  prefectures.value = data.response.prefecture
})

const loadCities = async () => {
  selectedCity.value = ''
  const res = await fetch(`https://geoapi.heartrails.com/api/json?method=getCities&prefecture=${selectedPref.value}`)
  const data = await res.json()
  cities.value = data.response.location
}

// 緯度経度情報の取得
const latitude = ref(null)
const longitude = ref(null)

const getCoordinates = async () => {
  const query = `${selectedPref.value}${selectedCity.value}`
    const res = await fetch(
      `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(query)}`
    )
    const data = await res.json()

    latitude.value = data[0].geometry.coordinates[1]
    longitude.value = data[0].geometry.coordinates[0]

    const coordinates = {
      latitude: latitude.value,
      longitude: longitude.value
    }

    emit('city', query)
    emit('coodinates', coordinates)
}
</script>

<template>
  <div class="main">
    <select
      v-model="selectedPref"
      @change="loadCities"
    >
      <option value="">都道府県を選択</option>

      <option
        v-for="pref in prefectures"
        :key="pref"
        :value="pref"
      >
        {{ pref }}
      </option>
    </select>
    <select
      v-model="selectedCity"
      :disabled="!selectedPref"
      @change="getCoordinates"
    >
      <option value="">市区町村を選択</option>

      <option
        v-for="city in cities"
        :key="city.city"
        :value="city.city"
      >
        {{ city.city }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

select {
  margin: 0.25rem 0;
  padding: 0.8rem;
  font-weight: bold;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  border-radius: 3rem;
  border-color: #2739dd;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='0.8rem' height='0.8rem' fill='%232739dd' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 5.5l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
}
</style>