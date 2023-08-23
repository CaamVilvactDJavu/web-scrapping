import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import SismonWrs from "./SismonWrs";
import SensorAcc from "./SensorAcc";
import SensorInt from "./SensorInt";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sismon_wrs" element={<SismonWrs />} />
          <Route path="/status_acc" element={<SensorAcc />} />
          <Route path="/status_int" element={<SensorInt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
