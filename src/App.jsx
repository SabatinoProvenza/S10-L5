import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import CityForecast from "./components/CityForecast.jsx"
import DayDetails from "./components/DayDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast/:city" element={<CityForecast />} />
        <Route path="/details/:city/:datetime" element={<DayDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
