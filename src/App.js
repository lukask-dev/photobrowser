import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Photo from './pages/Photo';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/photo/:name" element={<Photo />} />
      </Routes>
    </Router>
  );
}

export default App;