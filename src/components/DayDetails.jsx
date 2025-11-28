import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card, Spinner, Row, Col } from "react-bootstrap"

const API_KEY = "67cfa920cfe881dc2f918e1f92b76645"

const DayDetails = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [dayForecast, setDayForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDayForecast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.city, params.datetime])

  const fetchDayForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${params.city},it&units=metric&lang=it&appid=${API_KEY}`
      )

      if (!response.ok) {
        throw new Error("Errore nel caricamento della pagina")
      }

      const data = await response.json()

      const selectedDate = params.datetime.split(" ")[0]

      const filtered = data.list.filter((item) =>
        item.dt_txt.startsWith(selectedDate)
      )

      setDayForecast(filtered)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />

  return (
    <Container className="mt-4">
      <div className="mb-3 d-flex justify-content-center gap-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/forecast/${params.city}`)}
        >
          Torna indietro
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Torna alla home
        </button>
      </div>

      <h2 className="text-center mb-4">Dettagli meteo - {params.city}</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <Row className="justify-content-center ">
        {dayForecast.map((hour, index) => {
          const time = hour.dt_txt.split(" ")[1].slice(0, 5)

          return (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="text-center p-2 shadow mb-3 mx-auto"
                style={{ maxWidth: "16rem", fontSize: "0.85rem" }}
              >
                <h5>{time}</h5>

                <div className="d-flex justify-content-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt="icon"
                    style={{ width: "60px" }}
                  />
                </div>

                <p>{hour.weather[0].description}</p>
                <h4>{Math.round(hour.main.temp)}°C</h4>

                <p>Umidità: {hour.main.humidity}%</p>
                <p>Vento: {hour.wind.speed} km/h</p>
                <p>Pressione: {hour.main.pressure} Pa</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default DayDetails
