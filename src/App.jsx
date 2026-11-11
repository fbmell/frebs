import { useState } from 'react'

const navLinks = [
  { label: 'Funktioner', href: '#funktioner' },
  { label: 'Om os', href: '#om' },
  { label: 'Priser', href: '#priser' },
  { label: 'Kontakt', href: '#kontakt' },
]

const features = [
  {
    title: 'Lynhurtig',
    text: 'Bygget til fart fra bunden, så dine sider indlæses på et øjeblik – også på mobilen.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: 'Sikker som standard',
    text: 'Moderne sikkerhed er slået til fra start, så du kan fokusere på det, der betyder noget.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z"
      />
    ),
  },
  {
    title: 'Fleksibel',
    text: 'Tilpas alt efter dine behov med komponenter, der passer sammen på tværs af projektet.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h10"
      />
    ),
  },
]

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 text-lg font-bold text-slate-900">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-md">
        F
      </span>
      Frebs
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-violet-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Kom i gang
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Åbn menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-slate-900 px-3 py-2 text-center font-semibold text-white"
            >
              Kom i gang
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50 via-white to-white" />
      <div className="absolute -top-24 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700 shadow-sm">
          <span className="size-2 rounded-full bg-violet-500" />
          Nyt: version 2.0 er ude
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl">
          Byg noget fantastisk{' '}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            hurtigere end nogensinde
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-slate-600">
          Frebs giver dig værktøjerne til at gå fra idé til færdigt produkt på rekordtid – uden at gå på
          kompromis med kvalitet eller design.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#kontakt"
            className="w-full rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-700 sm:w-auto"
          >
            Kom i gang gratis
          </a>
          <a
            href="#funktioner"
            className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 sm:w-auto"
          >
            Læs mere
          </a>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="funktioner" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Alt hvad du har brug for
        </h2>
        <p className="mt-4 text-slate-600">
          Tre gode grunde til, at teams vælger Frebs til deres næste projekt.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="grid size-12 place-items-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
              <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {feature.icon}
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-slate-600">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="kontakt" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-violet-600">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Frebs. Alle rettigheder forbeholdes.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
