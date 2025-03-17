import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import StatsPage from './Pages/StatsPage';



export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  )
 
}


