/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		store.js
 * Description:     The Redux Store.
 *
 */


import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import earthquakesReducer from '../features/earthquakes/earthquakesSlice'
import telegramReportsReducer from "../features/reports/telegram/telegramReportsSlice";
import nowcastsReducer from "../features/nowcasts/nowcastsSlice";
import weatherReducer from "../features/weather/weatherSlice"
import twitterReportsReducer from "../features/reports/twitter/twitterReportsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    earthquakes: earthquakesReducer,
    telegramReports: telegramReportsReducer,
    twitterReports: twitterReportsReducer,
    nowcasts: nowcastsReducer,
    weather: weatherReducer,
  },
});
