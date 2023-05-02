import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeManager from "./pages/EmployeeManagerPage/EmployeeManager";
import LandingPage from "./pages/LandingPage";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = "http://localhost:9191";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee" element={<EmployeeManager />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
