import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Redirect from './pages/Redirect';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/redirect" element={<Redirect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;