import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="pt-40 pb-24 text-center px-5 max-w-2xl mx-auto">
      <p className="label mb-3">404 · Out of bounds</p>
      <h1 className="bronze-text text-4xl sm:text-6xl font-extrabold">Lost in the formation</h1>
      <p className="mt-4 text-[#d8d3c6]">That page does not exist inside the Chakravyuh.</p>
      <div className="mt-8">
        <Link to="/" className="btn btn-primary">Back to the gate</Link>
      </div>
    </div>
  )
}
