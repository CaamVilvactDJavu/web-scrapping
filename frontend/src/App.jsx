import React from 'react';
import './App.css';
import Home from './Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Home</h1>
        <Home />
      </header>
      <Footer />
    </div>
  );
}

export default App;
