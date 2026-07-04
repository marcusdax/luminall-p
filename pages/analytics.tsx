import Head from 'next/head'
import Link from 'next/link'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Analytics - Luminall PropertyInsight</title>
        <meta name="description" content="Property market analytics and insights" />
      </Head>

      <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Luminall PropertyInsight</h1>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <Link href="/properties" className="hover:text-gray-200">Properties</Link>
              <Link href="/analytics" className="hover:text-gray-200 font-bold">Analytics</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Property Analytics Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Market Trends</h3>
              <p className="text-gray-600">Real-time market data and trend analysis</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Investment ROI</h3>
              <p className="text-gray-600">Calculate return on investment for properties</p>
            </div>
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