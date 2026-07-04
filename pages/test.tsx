export default function TestPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6' }}>
      <h1 style={{ color: '#1f2937', fontSize: '2rem', fontWeight: 'bold' }}>
        Luminall PropertyInsight
      </h1>
      <p style={{ color: '#4b5563', marginTop: '1rem' }}>
        This is a test page to verify basic functionality.
      </p>
      <button 
        style={{ 
          marginTop: '1rem', 
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </button>
    </div>
  )
}