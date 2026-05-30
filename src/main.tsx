import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Providers from "./contexts/Providers.tsx";
import {CountryContextProvider} from "./contexts/CountryContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers
        providers={[
            <CountryContextProvider />,
        ]}
    >
        <App />
    </Providers>
  </StrictMode>,
)
