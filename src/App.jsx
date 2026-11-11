import { useState } from 'react'
import SnapDemo from './components/SnapDemo.jsx'

const YEAR = new Date().getFullYear()

const navLinks = [
  { label: 'Teknologien', href: '#teknologi' },
  { label: 'Om os', href: '#om' },
  { label: 'Priser', href: '#priser' },
  { label: 'Kontakt', href: '#kontakt' },
]

const stats = [
  { value: '2,4 mia.', label: 'strå knækket' },
  { value: '50/50', label: 'præcision pr. halvdel' },
  { value: '0,3 sek.', label: 'fra hel til halv' },
  { value: '100 %', label: 'passer i gryden' },
]

const press = ['Gryde & Gourmet', 'Pastaposten', 'Kogepladen', 'Det Kulinariske Ugeblad']

const features = [
  {
    title: 'MidPoint™-laser',
    text: 'Finder strået midtpunkt med en tolerance på 0,01 mm. Ingen halvdel er nogensinde længere end den anden.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3m-9-4a4 4 0 100 8 4 4 0 000-8z" />,
  },
  {
    title: 'Krummefrit knæk',
    text: 'Vores patenterede SnapCore™-teknik knækker uden at efterlade så meget som en krumme på køkkenbordet.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" />,
  },
  {
    title: 'Akustisk tunet',
    text: 'Hvert knæk er finjusteret til det perfekte, tilfredsstillende snap. Vi har en lydtekniker ansat på fuld tid.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5zm4.5 3.5a5 5 0 010 7m3-10a9 9 0 010 13" />,
  },
  {
    title: '0 % spild',
    text: 'Begge halvdele leveres. Altid. Du får præcis lige så meget pasta, som du havde. Den er bare kortere.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M18 3v4h-4M6 21v-4h4" />,
  },
]

const steps = [
  { title: 'Vi henter', text: 'Din spaghetti afhentes i klimastyret transport ved 18 °C.' },
  { title: 'Vi måler', text: 'MidPoint™-laseren scanner hvert strå og finder dets præcise centrum.' },
  { title: 'Vi knækker', text: 'SnapCore™ deler strået i to. Én bevægelse, ét snap, nul krummer.' },
  { title: 'Du koger', text: 'Pastaen leveres i to halvdele og passer i din gryde. Hver gang.' },
]

const testimonials = [
  {
    quote: 'Jeg har ikke set min gryde så glad i årevis.',
    name: 'Bente K.',
    role: 'Hjemmekok, Odense',
  },
  {
    quote: 'Halvdelene er så ens, at jeg ikke kan kende forskel. Det er næsten uhyggeligt.',
    name: 'Jonas M.',
    role: 'Studerende, Aarhus',
  },
  {
    quote: 'Vi knækkede selv i femten år. Aldrig igen.',
    name: 'Familien Holm',
    role: 'Roskilde',
  },
]

const plans = [
  {
    name: 'Hobby',
    price: '0 kr.',
    period: 'for evigt',
    description: 'Til den nysgerrige, der vil mærke forskellen.',
    perks: ['10 knæk om måneden', 'Standard-snap', 'Krummegaranti'],
    cta: 'Start gratis',
  },
  {
    name: 'Al Dente',
    price: '49 kr.',
    period: 'pr. måned',
    description: 'Til hjemmet, hvor pasta er en livsstil.',
    perks: ['Ubegrænsede knæk', 'MidPoint™-laser', 'Akustisk tunet snap', 'Levering i to halvdele'],
    cta: 'Vælg Al Dente',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Kontakt os',
    period: '',
    description: 'Til restauranter, kantiner og meget store familier.',
    perks: ['Dedikeret knækansvarlig', 'SLA på 0,3 sek. pr. strå', 'Vi knækker også linguine', 'Spørg ikke om lasagne'],
    cta: 'Book en demo',
  },
]

function Icon({ children, className = 'size-6' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  )
}

function Check() {
  return (
    <Icon className="size-5 shrink-0 text-amber-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </Icon>
  )
}

function Eyebrow({ children }) {
  return <p className="font-mono text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase">{children}</p>
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white">
      <span className="grid size-9 place-items-center rounded-xl bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/30">
        <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 16l7.2-4.2M13.8 11.8L21 16" />
        </svg>
      </span>
      Frebs
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-zinc-400 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <a
            href="#priser"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
          >
            Bestil knæk
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Luk menu' : 'Åbn menu'}
          className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 md:hidden"
        >
          <Icon>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </Icon>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-zinc-300 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#priser"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-amber-400 px-3 py-2 text-center font-semibold text-zinc-950"
            >
              Bestil knæk
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
            <span className="size-1.5 rounded-full bg-amber-400" />
            Nyt: SnapCore™ 3.0 knækker 40 % mere præcist
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
            Spaghetti, der{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
              passer i gryden.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-pretty text-zinc-400">
            Frebs er førende inden for præcisionsknæk af spaghetti. Vi deler hvert eneste strå i to perfekte
            halvdele, så din pasta endelig passer i den gryde, du rent faktisk ejer.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#priser"
              className="rounded-xl bg-amber-400 px-6 py-3 text-center font-semibold text-zinc-950 shadow-lg shadow-amber-400/25 transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Bestil knækket pasta
            </a>
            <a
              href="#teknologi"
              className="rounded-xl border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/5"
            >
              Se teknologien
            </a>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            Betroet af over <span className="font-semibold text-zinc-300">12.000 for små gryder</span> i hele Norden.
          </p>
        </div>

        <div id="demo">
          <SnapDemo />
        </div>
      </div>

      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6 sm:px-6">
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-500 uppercase">Som omtalt i</span>
          {press.map((name) => (
            <span key={name} className="font-display text-lg font-semibold text-zinc-500">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-950 p-6 sm:p-8">
            <dt className="text-sm text-zinc-400">{stat.label}</dt>
            <dd className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Problem() {
  const before = ['Stikker op over kanten', 'Ujævne, hjemmelavede knæk', 'Krummer på gulvet', 'Venten på at den bløder op']
  const after = ['Passer perfekt i gryden', 'Præcis 50/50 hver gang', 'Krummefrit', 'Klar med det samme']

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>Problemet</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
            Spaghetti er 25 cm. Din gryde er 20.
          </h2>
          <p className="mt-6 text-lg text-pretty text-zinc-400">
            I årtier har danskerne stået med en håndfuld pasta, der stikker op over kanten. Nogle har ventet på, at
            den blev blød. Andre har knækket den selv med ujævne halvdele og krummer overalt til følge. Det var før
            Frebs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-rose-400 uppercase">Før Frebs</p>
            <ul className="mt-4 space-y-3">
              {before.map((item) => (
                <li key={item} className="flex gap-3 text-zinc-400">
                  <Icon className="size-5 shrink-0 text-rose-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  </Icon>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">Med Frebs</p>
            <ul className="mt-4 space-y-3">
              {after.map((item) => (
                <li key={item} className="flex gap-3 text-zinc-200">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Technology() {
  return (
    <section id="teknologi" className="scroll-mt-20 border-t border-white/5 bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>Teknologien</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ingeniørkunst. Til pasta.
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Bag hvert eneste knæk ligger seks års forskning, tre patenter og et uanstændigt antal pakker spaghetti.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-zinc-950 p-8 transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <div className="grid size-12 place-items-center rounded-xl bg-amber-400/10 text-amber-400 transition group-hover:bg-amber-400 group-hover:text-zinc-950">
                <Icon>{feature.icon}</Icon>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-zinc-400">{feature.text}</p>
            </div>
          ))}
        </div>

        <ol className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-white/10 pt-6">
              <span className="font-mono text-sm text-amber-400">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="om" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Eyebrow>Om os</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
            Startet i en for lille gryde.
          </h2>
        </div>
        <div className="space-y-5 text-lg text-zinc-400 lg:col-span-3">
          <p>
            Frebs blev grundlagt en helt almindelig tirsdag aften, da vores stifter stod med en pakke spaghetti og en
            gryde på 20 centimeter. Pastaen ville ikke ned. Han nægtede at vente.
          </p>
          <p>
            I dag er vi 40 medarbejdere, tre laboratorier og én meget stor gryde, som vi udelukkende bruger til test.
            Vores mission er enkel: ingen spaghetti skal nogensinde stikke op over kanten igen.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-2xl border border-white/10 bg-zinc-900/50 p-8">
            <blockquote className="flex-1 font-display text-xl leading-snug text-white">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-zinc-200">{t.name}</span>
              <span className="text-zinc-500"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="priser" className="scroll-mt-20 border-t border-white/5 bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Priser</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Halv pasta. Hele prisen værd.
          </h2>
          <p className="mt-6 text-lg text-zinc-400">Ingen binding. Ingen skjulte gebyrer. Ingen hele strå.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.featured
                  ? 'border-amber-400 bg-gradient-to-b from-amber-400/10 to-zinc-950 shadow-2xl shadow-amber-400/10'
                  : 'border-white/10 bg-zinc-950'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-zinc-950">
                  Mest populær
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-zinc-300">
                    <Check />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`mt-8 rounded-xl px-6 py-3 text-center font-semibold transition ${
                  plan.featured
                    ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
                    : 'border border-white/15 text-white hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="kontakt" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/15 via-zinc-900 to-zinc-950 px-6 py-16 text-center sm:px-16">
        <div className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />
        <h2 className="font-display text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
          Klar til at passe i gryden?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
          Skriv din e-mail, så kontakter en af vores knækspecialister dig inden for 0,3 sekunder. Cirka.
        </p>

        {sent ? (
          <p role="status" className="mt-10 font-semibold text-emerald-400">
            Tak! Vi vender tilbage, så snart vi har knækket et par strå.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="din@email.dk"
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-zinc-950/60 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300"
            >
              Få et knæk
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-zinc-400 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="text-center text-sm text-zinc-500 md:text-right">
          <p>© {YEAR} Frebs. Alle rettigheder forbeholdes.</p>
          <p className="mt-1 text-xs text-zinc-600">Ingen italienere blev konsulteret under udviklingen.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Problem />
        <Technology />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
