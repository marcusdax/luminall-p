import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch properties from our API
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-8">Loading properties...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Properties - Luminall PropertyInsight</title>
        <meta name="description" content="Browse available properties" />
      </Head>

      <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Luminall PropertyInsight</h1>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <Link href="/properties" className="hover:text-gray-200 font-bold">Properties</Link>
              <Link href="/analytics" className="hover:text-gray-200">Analytics</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <div key={property.id} className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-2">{property.address}</h3>
                <p className="text-gray-600 mb-1">${property.price.toLocaleString()}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {property.bedrooms} beds, {property.bathrooms} baths, {property.squareFeet} sqft
                </p>
                <p className="text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {property.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Luminall PropertyInsight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}