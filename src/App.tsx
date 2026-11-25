import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Lazy-load inner pages to keep initial mobile bundle lean
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Journey = lazy(() => import('./pages/Journey'))
const Prizes = lazy(() => import('./pages/Prizes'))
const Judges = lazy(() => import('./pages/Judges'))
const Partners = lazy(() => import('./pages/Partners'))
const Register = lazy(() => import('./pages/Register'))
const Shortlist = lazy(() => import('./pages/Shortlist'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageFallback() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <p className="font-mono text-xs tracking-[.2em] uppercase text-cyan animate-pulse">Loading...</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </BrowserRouter>
  )
}
