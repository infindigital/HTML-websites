import { Component } from 'react'

// =====================================================================
//  ExperienceBoundary — a visible error boundary for the invitation.
//  A blank page tells us nothing. If any scene throws while rendering,
//  this catches it and shows the actual error on screen (and logs it),
//  so a failure is diagnosable instead of an empty page.
// =====================================================================
export default class ExperienceBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    // Surface it in the console for anyone with devtools open.
    // eslint-disable-next-line no-console
    console.error('[invitation] render error:', error, info)
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    const stack = (info && info.componentStack ? info.componentStack : '')
      .split('\n')
      .slice(0, 8)
      .join('\n')

    return (
      <div
        role="alert"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '14px',
          padding: '32px 22px',
          background: '#1a0d10',
          color: '#f4e4c8',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.5,
        }}
      >
        <p style={{ margin: 0, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.72rem', color: '#e0b46a' }}>
          The invitation hit an error
        </p>
        <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, wordBreak: 'break-word' }}>
          {String(error && (error.message || error))}
        </p>
        {stack && (
          <pre
            style={{
              margin: 0,
              maxWidth: '100%',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              fontSize: '0.72rem',
              color: '#c9b48f',
              background: 'rgba(0,0,0,0.25)',
              padding: '12px',
              borderRadius: '8px',
            }}
          >
            {stack}
          </pre>
        )}
        <a href="#/" style={{ color: '#e0b46a', fontSize: '0.85rem' }}>← Back to the collection</a>
      </div>
    )
  }
}
