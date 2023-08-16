import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react';
import Home from './Home';
import Sensor from "./Sensor";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sensors" element={<Sensor />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
