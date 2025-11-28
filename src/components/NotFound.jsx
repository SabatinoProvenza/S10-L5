import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 className="display-3">404</h1>
      <p className="fs-4 text-center">
        Ops! La pagina che stai cercando non esiste
      </p>

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Torna alla Home
      </button>
    </Container>
  )
}

export default NotFound
