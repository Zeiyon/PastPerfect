import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UpscalerPage from './pages/UpscalerPage'
import RestorePage from './pages/RestorePage'
import RestoreProcessingPage from './pages/RestoreProcessingPage'
import Layout from './components/Layout'
import PricingPage from "./pages/PricingPage";
import ScrollRestoration from './components/ScrollRestoration'

export default function App() {
  return (
    <Router>
      <ScrollRestoration />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upscale" element={<UpscalerPage />} />
          <Route path="/restore" element={<RestorePage />} />
          <Route path="/restore/processing" element={<RestoreProcessingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
