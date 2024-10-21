import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { Home } from './pages/home/Home.tsx'
import { Provider } from './proviser.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
    <Home />
    </Provider>
  </StrictMode>,
)
