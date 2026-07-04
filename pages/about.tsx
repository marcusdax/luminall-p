import Head from 'next/head'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - Luminall PropertyInsight</title>
        <meta name="description" content="Learn about Luminall PropertyInsight" />
      </Head>

      <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Luminall PropertyInsight</h1>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <Link href="/properties" className="hover:text-gray-200">Properties</Link>
              <Link href="/analytics" className="hover:text-gray-200">Analytics</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About Luminall PropertyInsight</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-gray-600">
              Luminall PropertyInsight is a cutting-edge property intelligence platform that leverages 
              artificial intelligence to provide unparalleled insights into real estate markets.
            </p>
            <p className="text-gray-600">
              Our mission is to empower property owners, investors, and real estate professionals with 
              data-driven insights to make smarter decisions. We combine advanced analytics with 
              market expertise to deliver actionable intelligence.
            </p>
            <p className="text-gray-600">
              Founded in 2023, we've quickly become a trusted name in property intelligence, serving 
              clients across residential and commercial real estate sectors.
            </p>
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