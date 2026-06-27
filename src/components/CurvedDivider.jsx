export default function CurvedDivider({ fromColor = '#ffffff', toColor = '#F8F9FA', flip = false, height = 80 }) {
  return (
    <div style={{ lineHeight: 0, display: 'block', overflow: 'hidden', background: toColor, marginTop: '-1px', position: 'relative' }}>
      {/* Green-tinted overlay on the curve */}
      <svg
        viewBox={`0 0 1440 ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: `${height}px`, transform: flip ? 'scaleX(-1)' : 'none', position: 'relative', zIndex: 1 }}
      >
        <defs>
          <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="1" />
            <stop offset="40%" stopColor="#2D7A4F" stopOpacity="0.10" />
            <stop offset="70%" stopColor="#4CAF7A" stopOpacity="0.07" />
            <stop offset="100%" stopColor={fromColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={`M0,0 C360,${height} 1080,0 1440,${height} L1440,0 L0,0 Z`}
          fill={fromColor}
        />
        <path
          d={`M0,0 C360,${height} 1080,0 1440,${height} L1440,0 L0,0 Z`}
          fill="url(#curveGrad1)"
          opacity="0.35"
        />
      </svg>
    </div>
  )
}

export function WaveDivider({ fromColor = '#ffffff', toColor = '#F8F9FA', flip = false }) {
  return (
    <div style={{ lineHeight: 0, display: 'block', overflow: 'hidden', background: toColor, marginTop: '-1px' }}>
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '60px', transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D7A4F" stopOpacity="0.10" />
            <stop offset="50%" stopColor="#4CAF7A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2D7A4F" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path d="M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1200,60 1320,0 1440,30 L1440,60 L0,60 Z" fill={fromColor} />
        <path d="M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1200,60 1320,0 1440,30 L1440,60 L0,60 Z" fill="url(#waveGrad1)" opacity="0.4" />
      </svg>
    </div>
  )
}

export function BlobDivider({ fromColor = '#ffffff', toColor = '#F8F9FA' }) {
  return (
    <div style={{ lineHeight: 0, display: 'block', overflow: 'hidden', background: toColor, marginTop: '-2px' }}>
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100px' }}
      >
        <defs>
          <linearGradient id="blobGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4CAF7A" stopOpacity="0.12" />
            <stop offset="30%" stopColor="#2D7A4F" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#4CAF7A" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#2D7A4F" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path d="M0,0 L0,60 Q180,110 360,60 Q540,10 720,60 Q900,110 1080,60 Q1260,10 1440,60 L1440,0 Z" fill={fromColor} />
        <path d="M0,0 L0,60 Q180,110 360,60 Q540,10 720,60 Q900,110 1080,60 Q1260,10 1440,60 L1440,0 Z" fill="url(#blobGrad1)" opacity="0.5" />
      </svg>
    </div>
  )
}
