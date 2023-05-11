import React from "react"
import { ProvideDateService } from "./service/DateService"
import App from "./App"

export const DateCalc = () => (
    <ProvideDateService>
        <App />
    </ProvideDateService>

)