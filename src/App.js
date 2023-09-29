import React, { useState } from "react"
import { ParafinElements } from "@parafin/react-parafin-elements"

import './App.css';

function App() {
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [personId, setPersonId] = useState(null)

  const fetchToken = async (e) => {
    e.preventDefault()
    const response = await fetch(`/parafin/token/${personId}`)
    const data = await response.json()

    if (!data) {
      setError(true)
    } else {
      setToken(data.parafinToken)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>GrubDash</h1>
      {!token && (
        <>
          <form onSubmit={fetchToken}>
            <p style={{ margin: 0 }}>Input Person Id</p>
            <div className="input-wrapper">
              <input 
                autoFocus
                className="person-id-input"
                placeholder="your-person-id"
                name="personId"
                onChange={e => setPersonId(e.target.value)}
              />
              <input type="submit" className="submit" />
            </div>
          </form>
        </>
      )}
      {token && (
        <div className="parafin-container">
          <ParafinElements
            product="capital"
            environment="production"
            token={token}
          />
        </div>
      )}
      <p
        style={{
        color: "red",
        fontWeight: "bold",
        fontSize: 20,
        visibility: error ? "visible" : "hidden",
        }}>
          We had an issue setting your Person ID. Please check this value and try again!
      </p>
      </header>
    </div>
  );
}

export default App;
