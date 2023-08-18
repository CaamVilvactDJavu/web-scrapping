import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react';
import Home from './Home';
import Sensor from "./Sensor";
import Sensor2 from "./Sensor2";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sensors" element={<Sensor />} />
          <Route path="/sensors2" element={<Sensor2 />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
