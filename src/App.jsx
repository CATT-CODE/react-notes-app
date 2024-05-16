import './App.css'
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route path='/' element={<h1>Main Page</h1>} />
          <Route path='/:id'>
            <Route index element={<h1>A note</h1>} />
            <Route path='edit' element={<h1>A note</h1>} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>

    </>
  )
}

export default App
