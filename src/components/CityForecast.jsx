import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card, Spinner, Row, Col } from "react-bootstrap"

const API_KEY = "67cfa920cfe881dc2f918e1f92b76645"

const CityForecast = () => {
  const params = useParams()

  const navigate = useNavigate()
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchForecast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.city])

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&units=metric&lang=it&appid=${API_KEY}`
      )

      if (!response.ok) throw new Error("Errore nel caricamento dati")

      const data = await response.json()
      const daily = data.list.filter((_, index) => index % 8 === 0).slice(0, 5)
      setForecast(daily)
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
      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Torna alla Home
        </button>
      </div>

      <h2 className="text-center mb-4">Previsioni 5 giorni - {params.city}</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <Row className="justify-content-center g-3 p-3">
        {forecast.map((day, index) => {
          const date = new Date(day.dt_txt).toLocaleDateString("it-IT", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })

          return (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={2}
              className="d-flex justify-content-center"
            >
              <Card
                className="text-center p-2 shadow"
                style={{ width: "100%", maxWidth: "16rem" }}
              >
                <h5>{date}</h5>

                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="icon"
                />

                <p>{day.weather[0].description}</p>
                <strong>{Math.round(day.main.temp)}°C</strong>

                <div className="d-flex justify-content-center mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/details/${params.city}/${day.dt_txt}`)
                    }
                  >
                    Vai ai dettagli
                  </button>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default CityForecast
