import React, { useState } from 'react'

const App = () => {
  const [resumeText, setResumeText] = useState('')
  const [suggestion, setSuggestion] = useState('')

  const getSuggestion = async () => {
    try {
      const response = await fetch('https://resume-backend-6dsy.onrender.com/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeText }),
      })
      const data = await response.json()
      setSuggestion(data.suggestion)
    } catch (error) {
      console.error('Error:', error)
      setSuggestion('Error fetching suggestion.')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>Smart Resume Builder</h1>
      <textarea
        placeholder="Paste your resume here..."
        rows={10}
        style={{ width: '100%', marginTop: '1rem' }}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <button onClick={getSuggestion} style={{ marginTop: '1rem' }}>
        Get AI Suggestions
      </button>
      {suggestion && (
        <div style={{ marginTop: '2rem' }}>
          <h3>AI Suggestion:</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  )
}

export default App
