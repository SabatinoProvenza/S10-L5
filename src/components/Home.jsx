import { useState } from "react"
import { Container, Form, Button, Card, Spinner } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const Home = function () {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_KEY = "67cfa920cfe881dc2f918e1f92b76645"

  const fetchWeather = async (e) => {
    e.preventDefault()

    if (!city) return
    setLoading(true)
    setError("")
    setWeather(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},it&units=metric&lang=it&appid=${API_KEY}`
      )

      if (!response.ok) {
        throw new Error("Città non trovata")
      }

      const data = await response.json()
      setWeather(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <img
        src="src\assets\immagine titolo.png"
        alt="Il Meteo di Sabatino"
        style={{
          maxWidth: "280px",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <Form onSubmit={fetchWeather} className="d-flex gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Inserisci una città"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button type="submit">Cerca</Button>
      </Form>
      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">{error}</p>}
      {weather && (
        <Card style={{ width: "18rem" }} className="text-center shadow">
          <Card.Body>
            <Card.Title>{weather.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {weather.weather[0].description}
            </Card.Subtitle>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p>Umidità: {weather.main.humidity}%</p>
            <p>Vento: {weather.wind.speed} km/h</p>
            <button className="btn btn-primary">Vai ai dettagli</button>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default Home
