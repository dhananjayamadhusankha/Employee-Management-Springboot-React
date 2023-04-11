import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import NavBar from './layout/NavBar';
import Home from './pages/Home';
import AddEmployee from './employee/AddEmployee';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/addEmployee" element={<AddEmployee/>} />
      </Routes>
      <Home />
      </Router>
    </div>
  );
}

export default App;
