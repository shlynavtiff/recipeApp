import React from "react";
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    
  );
};

export default App;
