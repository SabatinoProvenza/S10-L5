import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import CityForecast from "./components/CityForecast.jsx"
import DayDetails from "./components/DayDetails"
import NotFound from "./components/NotFound.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast/:city" element={<CityForecast />} />
        <Route path="/details/:city/:datetime" element={<DayDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
