import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import CityForecast from "./components/CityForecast.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast/:city" element={<CityForecast />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
