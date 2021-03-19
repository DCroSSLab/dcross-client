import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import earthquakesReducer from '../features/earthquakes/earthquakesSlice'
import telegramReportsReducer from "../features/reports/telegram/telegramReportsSlice";
import nowcastsReducer from "../features/nowcasts/nowcastsSlice";
import weatherReducer from "../features/weather/weatherSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    earthquakes: earthquakesReducer,
    telegramReports: telegramReportsReducer,
    nowcasts: nowcastsReducer,
    weather: weatherReducer,
  },
});
