import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css';

// Components
import Navigation from './components/navbar'

// Pages
import Home from './pages/home'
import Info from './pages/info'

ReactDOM.render(
  <React.StrictMode>
    <>
    <Router>
      <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
