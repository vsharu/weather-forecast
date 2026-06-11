<script setup>
import { ref } from 'vue'
import { ja } from 'date-fns/locale'

const today = new Date()
today.setHours(0, 0, 0, 0)
const date = ref(today)
const maxDate = new Date(today)
maxDate.setDate(today.getDate() + 6)

const formatDate = { input: 'yyyy年M月d日' }
const timeConfig = { enableTimePicker: false }
const weekStartIsMonday = 1 // 月曜始まり
const datePickerIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const inputAttrs = { hideInputIcon: true, clearable: false }

const firstPointClear = ref(false)
const secondPointClear = ref(false)
</script>

<template>
  <header class="bg-diagonal">
    Weather Forecast
  </header>

  <main>
    <div class="dp">
      <!-- 日付を選択する -->
      <VueDatePicker
        v-model="date"
        class="date-picker"
        :locale="ja"
        :formats="formatDate"
        :min-date="today"
        :max-date="maxDate"
        :time-config="timeConfig"
        :week-start="weekStartIsMonday"
        :dark="datePickerIsDark"
        :input-attrs="inputAttrs"
        disable-year-select
        auto-apply
      />
      <button @click="firstPointClear = true">地点1をクリア</button>
      <button @click="secondPointClear = true">地点2をクリア</button>
    </div>
    
    <div class="panel">
      <!-- 1つめの都市 -->
      <WeatherPanel
        :date="date"
        :point-clear="firstPointClear"
        @point-clear="firstPointClear = $event"
      />
    </div>
    
    <div class="panel">
      <!-- 2つめの都市 -->
      <WeatherPanel
        :date="date"
        :point-clear="secondPointClear"
        @point-clear="secondPointClear = $event"
      />
    </div>
  </main>

  <footer>
    Haru.M All Rights Reserved.
  </footer>
</template>

<style scoped>
header {
  height: 8vh;
  font-size: 1.8em;
  font-weight: bold;
  color: midnightblue;
  text-align: center;
  text-shadow: 0px 0px 8px white;
  background-color: lightskyblue;
  border-radius: 10px;
  padding: 0.5em;
  align-items: center;
  justify-content: center;
  display: flex;
}

main {
  width: 100%;
  padding: 0.2rem 0.3rem 0.2rem 0.3rem;
  display: flex;
  flex-direction: column;
}

.dp {
  height: 1.5rem;
  align-content: center;
  justify-content: center;
  display: flex;
}

:deep(.dp--input) {
  border: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  font-size: 0.9rem;
}

.date-picker {
  width: 7rem;
}

button {
  border-radius: 2em;
  border: 0.5px solid midnightblue;
  padding: 0.1em 0.5em;
  margin: 0 0.5em;
  background-color: aliceblue;
  color: 	cornflowerblue;
  font-size: 0.8em;
}

button:active {
  transform: translateX(1px) translateY(1.5px);
}

.panel {
  height: 20rem;
  align-content: center;
}

footer {
  height: 4vh;
  font-size: 0.8em;
  color: midnightblue;
  text-align: center;
  text-shadow: 0px 0px 5px white;
  background-color: lightskyblue;
  border-radius: 5px;
  padding: 0.3em;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>