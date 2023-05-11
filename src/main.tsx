import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "the-new-css-reset/css/reset.css"
import { ProvideDateService } from './service/DateService'
import { DateCalc } from './DateCalc'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DateCalc />
  </React.StrictMode>
)
