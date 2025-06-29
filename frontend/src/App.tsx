import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UpscalerPage from './pages/UpscalerPage'
import Layout from './components/Layout'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upscaler" element={<UpscalerPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
