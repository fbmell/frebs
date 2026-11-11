import { useEffect, useRef, useState } from 'react'

// SVG coordinates (viewBox 0 0 480 400). A whole strand spans LEFT..RIGHT and
// breaks at MID. The pot opening is 220 wide, so only halves (180) fit.
const LEFT = 60
const MID = 240
const RIGHT = 420

const TILTS = [-0.8, 0.6, -0.4, 0.9, -0.6, 0.4, -0.9, 0.2]
const REST_ROT = [
  [-4, 3],
  [3, -5],
  [-2, 4],
  [5, -2],
  [-3, 5],
  [2, -3],
  [-5, 2],
  [4, -4],
]

const STRANDS = TILTS.map((tilt, i) => {
  const jitter = ((i % 3) - 1) * 8
  return {
    id: i,
    y: 92 + i * 13,
    tilt,
    halves: [
      { side: -1, x1: LEFT, x2: MID, dx: 90 + jitter, restY: 248 + (i % 4) * 5, restRot: REST_ROT[i][0] },
      { side: 1, x1: MID, x2: RIGHT, dx: -90 + jitter, restY: 250 + ((i + 2) % 4) * 5, restRot: REST_ROT[i][1] },
    ],
  }
})

const CRUMBS = [
  { dx: -14, dy: -18, r: 2 },
  { dx: 12, dy: -22, r: 1.6 },
  { dx: -20, dy: 6, r: 1.4 },
  { dx: 18, dy: 10, r: 2 },
  { dx: -4, dy: 24, r: 1.5 },
  { dx: 6, dy: -28, r: 1.2 },
]

function halfTransform(strand, half, phase) {
  if (phase === 'whole') {
    return { move: 'translate(0px, 0px)', rotate: `rotate(${strand.tilt}deg)` }
  }
  if (phase === 'snapped') {
    return { move: `translate(${half.side * 6}px, -8px)`, rotate: `rotate(${half.side * -16}deg)` }
  }
  return {
    move: `translate(${half.dx}px, ${half.restY - strand.y}px)`,
    rotate: `rotate(${half.restRot}deg)`,
  }
}

function playSnap(audioRef) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return
  audioRef.current ??= new AudioCtx()
  const ctx = audioRef.current
  if (ctx.state === 'suspended') ctx.resume()

  const duration = 0.12
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 6)
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 2500 + Math.random() * 1500
  filter.Q.value = 1.2
  const gain = ctx.createGain()
  gain.gain.value = 0.6

  source.connect(filter).connect(gain).connect(ctx.destination)
  source.start()
}

function Strand({ strand, phase, onSnap }) {
  const whole = phase === 'whole'
  const origin = `${MID}px ${strand.y}px`

  return (
    <g
      role="button"
      tabIndex={whole ? 0 : -1}
      aria-disabled={!whole}
      aria-label={`Spaghetti nr. ${strand.id + 1}${whole ? '' : ', knækket'}`}
      onClick={() => onSnap(strand.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSnap(strand.id)
        }
      }}
      className={`group outline-none ${whole ? 'cursor-pointer' : 'pointer-events-none'}`}
    >
      <g className="transition-transform duration-200 group-hover:-translate-y-1">
        {strand.halves.map((half) => {
          const t = halfTransform(strand, half, phase)
          return (
            <g
              key={half.side}
              className="transition-transform duration-700 ease-[cubic-bezier(0.6,-0.2,0.4,1.1)]"
              style={{ transform: t.move }}
            >
              <g
                className="transition-transform duration-300 ease-out"
                style={{ transform: t.rotate, transformOrigin: origin }}
              >
                <line
                  x1={half.x1}
                  x2={half.x2}
                  y1={strand.y + 0.8}
                  y2={strand.y + 0.8}
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  className="stroke-amber-600"
                />
                <line
                  x1={half.x1}
                  x2={half.x2}
                  y1={strand.y}
                  y2={strand.y}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  className="stroke-amber-300 transition-colors group-hover:stroke-yellow-200 group-focus-visible:stroke-white"
                />
                <line
                  x1={half.side < 0 ? half.x1 + 3 : half.x1}
                  x2={half.side < 0 ? half.x2 : half.x2 - 3}
                  y1={strand.y - 1}
                  y2={strand.y - 1}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="stroke-amber-50/60"
                />
              </g>
            </g>
          )
        })}
        {whole && (
          <line
            x1={LEFT}
            x2={RIGHT}
            y1={strand.y}
            y2={strand.y}
            strokeWidth="13"
            className="stroke-transparent"
            style={{ transform: `rotate(${strand.tilt}deg)`, transformOrigin: origin }}
          />
        )}
      </g>
    </g>
  )
}

function Pot({ children }) {
  return (
    <>
      <defs>
        <linearGradient id="frebs-pot" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#27272a" />
          <stop offset="0.35" stopColor="#52525b" />
          <stop offset="1" stopColor="#18181b" />
        </linearGradient>
      </defs>

      {/* Steam */}
      {[200, 240, 280].map((x, i) => (
        <path
          key={x}
          d={`M${x} 244 q-8 -12 0 -24 t0 -24`}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-steam stroke-white/20 motion-reduce:animate-none"
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}

      {/* Handles */}
      <rect x="104" y="280" width="30" height="10" rx="5" className="fill-zinc-600" />
      <rect x="346" y="280" width="30" height="10" rx="5" className="fill-zinc-600" />

      {/* Opening and water */}
      <ellipse cx="240" cy="262" rx="110" ry="20" className="fill-zinc-950" />
      <ellipse cx="240" cy="266" rx="102" ry="14" className="fill-sky-400/15" />
      <ellipse cx="240" cy="262" rx="110" ry="20" fill="none" strokeWidth="6" className="stroke-zinc-400" />

      {children}

      {/* Front of the pot, drawn over anything inside it */}
      <path
        d="M130 262 A110 20 0 0 0 350 262 L338 360 Q336 378 318 378 L162 378 Q144 378 142 360 Z"
        fill="url(#frebs-pot)"
      />
      <path d="M130 262 A110 20 0 0 0 350 262" fill="none" strokeWidth="6" className="stroke-zinc-300" />
      <path d="M160 288 L166 356" strokeWidth="6" strokeLinecap="round" className="stroke-white/10" />
      <text
        x="240"
        y="334"
        textAnchor="middle"
        className="fill-zinc-400 font-mono text-[12px] tracking-[0.25em]"
      >
        Ø 20 CM
      </text>
    </>
  )
}

export default function SnapDemo() {
  const initial = STRANDS.map(() => 'whole')
  const phasesRef = useRef(initial)
  const [phases, setPhases] = useState(initial)
  const [effects, setEffects] = useState([])
  const [soundOn, setSoundOn] = useState(true)
  const audioRef = useRef(null)
  const fxKey = useRef(0)
  const timers = useRef(new Set())

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.current.delete(id)
      fn()
    }, ms)
    timers.current.add(id)
  }

  const setPhase = (id, phase) => {
    phasesRef.current = phasesRef.current.map((p, i) => (i === id ? phase : p))
    setPhases(phasesRef.current)
  }

  const snap = (id) => {
    if (phasesRef.current[id] !== 'whole') return
    setPhase(id, 'snapped')
    if (soundOn) playSnap(audioRef)
    const key = fxKey.current++
    setEffects((fx) => [...fx, { key, y: STRANDS[id].y }])
    later(() => setPhase(id, 'fallen'), 320)
    later(() => setEffects((fx) => fx.filter((f) => f.key !== key)), 900)
  }

  const snapAll = () => {
    let n = 0
    STRANDS.forEach((s) => {
      if (phasesRef.current[s.id] === 'whole') later(() => snap(s.id), n++ * 110)
    })
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    timers.current.clear()
    phasesRef.current = STRANDS.map(() => 'whole')
    setPhases(phasesRef.current)
    setEffects([])
  }

  const broken = phases.filter((p) => p !== 'whole').length
  const done = phases.every((p) => p === 'fallen')

  let status = 'Tryk på en spaghetti for at knække den.'
  if (done) status = 'Perfekt. Alt passer i gryden.'
  else if (broken > 0) status = `${broken} af ${STRANDS.length} strå knækket.`

  return (
    <div className="relative rounded-3xl border border-white/10 bg-zinc-900/70 p-4 shadow-2xl shadow-amber-500/10 backdrop-blur sm:p-6">
      <div className="flex items-center justify-between font-mono text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
        <span className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Live demo
        </span>
        <span>SnapCore™ 3.0</span>
      </div>

      <svg viewBox="0 0 480 400" className="mt-2 h-auto w-full select-none" aria-labelledby="snap-demo-title">
        <title id="snap-demo-title">Spaghetti over en gryde. Tryk på et strå for at knække det.</title>

        {/* "Too long" measurement */}
        <g className={`transition-opacity duration-500 ${done ? 'opacity-0' : 'opacity-100'}`}>
          <line x1={LEFT} x2={RIGHT} y1="66" y2="66" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-rose-400/70" />
          <line x1={LEFT} x2={LEFT} y1="60" y2="72" strokeWidth="1.5" className="stroke-rose-400/70" />
          <line x1={RIGHT} x2={RIGHT} y1="60" y2="72" strokeWidth="1.5" className="stroke-rose-400/70" />
          <text x={MID} y="56" textAnchor="middle" className="fill-rose-400 font-mono text-[12px] tracking-[0.2em]">
            25 CM · FOR LANG
          </text>
        </g>

        {done && (
          <g className="animate-rise">
            <text x={MID} y="140" textAnchor="middle" className="fill-emerald-400 font-display text-[30px] font-bold">
              Passer perfekt.
            </text>
            <text x={MID} y="166" textAnchor="middle" className="fill-zinc-400 font-mono text-[12px] tracking-[0.2em]">
              2 × 12,5 CM
            </text>
          </g>
        )}

        <Pot>
          {STRANDS.map((strand) => (
            <Strand key={strand.id} strand={strand} phase={phases[strand.id]} onSnap={snap} />
          ))}
        </Pot>

        {effects.map((fx) => (
          <g key={fx.key} className="pointer-events-none">
            {CRUMBS.map((c, j) => (
              <circle
                key={j}
                cx={MID}
                cy={fx.y}
                r={c.r}
                className="animate-crumb fill-amber-200"
                style={{ '--dx': `${c.dx}px`, '--dy': `${c.dy}px` }}
              />
            ))}
            <text
              x={MID}
              y={fx.y - 14}
              textAnchor="middle"
              className="animate-pop origin-center fill-white font-display text-[15px] font-bold [transform-box:fill-box]"
            >
              KNÆK!
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={`text-sm font-medium ${done ? 'text-emerald-400' : 'text-zinc-300'}`}>
          {status}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSoundOn(!soundOn)}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Slå lyd fra' : 'Slå lyd til'}
            className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5z" />
              {soundOn ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 9l5 6M21 9l-5 6" />
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Nulstil
          </button>
          <button
            type="button"
            onClick={snapAll}
            disabled={broken === STRANDS.length}
            className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Knæk alle
          </button>
        </div>
      </div>
    </div>
  )
}
