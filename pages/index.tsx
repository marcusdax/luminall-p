export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Navigation */}
      <nav style={{ 
        background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
        padding: '1rem 2rem',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Luminall PropertyInsight</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/properties" style={{ color: 'white', textDecoration: 'none' }}>Properties</a>
            <a href="/analytics" style={{ color: 'white', textDecoration: 'none' }}>Analytics</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        backgroundColor: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Property Intelligence Platform
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            color: '#4b5563',
            marginBottom: '2rem'
          }}>
            AI-powered property insights and analytics for smarter decisions
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Get Started
            </button>
            <button style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: 'white',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f3f4f6' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#111827',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Key Features
          </h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                AI Analytics
              </h4>
              <p style={{ color: '#4b5563' }}>
                Advanced property analysis using artificial intelligence
              </p>
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Market Data
              </h4>
              <p style={{ color: '#4b5563' }}>
                Real-time market trends and insights
              </p>
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Smart Tools
              </h4>
              <p style={{ color: '#4b5563' }}>
                Intelligent recommendations and calculations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#111827',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p>© 2025 Luminall PropertyInsight. All rights reserved.</p>
      </footer>
    </div>
  )
}