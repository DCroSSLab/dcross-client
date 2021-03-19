import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Map from "./features/map/Map";
import {Drawer, Position} from "@blueprintjs/core";

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
