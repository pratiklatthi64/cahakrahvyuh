import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Contact, Faq, HowItWorks, Journey, Judges, NotFound, Partners, Prizes, Register, Shortlist } from './pages/Pages'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="journey" element={<Journey />} />
          <Route path="prizes" element={<Prizes />} />
          <Route path="judges" element={<Judges />} />
          <Route path="partners" element={<Partners />} />
          <Route path="register" element={<Register />} />
          <Route path="shortlist" element={<Shortlist />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
