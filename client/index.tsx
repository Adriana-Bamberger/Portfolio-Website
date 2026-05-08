import { createRoot } from 'react-dom/client'
import './main.css'
import 'aos/dist/aos.css'
import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(<App />)
})
