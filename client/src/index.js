import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css';

// Redux
import { Provider } from 'react-redux';
import Store from './store';

// Components
import Navigation from './components/navbar'

// Pages
import Home from './pages/home'
import Info from './pages/info'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
        <Navigation />
        <div class="px-4 py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
