'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ExternalLink,
  GitBranch,
  Mail,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react'
import {
  experiences,
  experienceTypes,
  featuredProjects,
  formatType,
  getVisibleExperiences,
  profile,
  roadmap,
  skills,
  typeClass,
  type Experience,
  type ExperienceType,
} from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }
  return (
    <button
      type="button"
      aria-label="테마 변경"
      onClick={toggle}
      className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 transition hover:border-[#233067]/40 dark:border-white/15"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/85 backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="hidden text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground sm:block">
            오늘의 기록
          </span>
        </Link>
        <nav
          aria-label="사이트 주요 메뉴"
          className="hidden items-center gap-8 md:flex"
        >
          <Link
            className="text-sm text-muted-foreground transition hover:text-foreground"
            href="/experience"
          >
            Experience
          </Link>
          <a
            className="text-sm text-muted-foreground transition hover:text-foreground"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-sm text-muted-foreground transition hover:text-foreground"
            href={profile.blog}
            target="_blank"
            rel="noreferrer"
          >
            Blog
          </a>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-black/10 dark:border-white/15"
            aria-label="메뉴 열기"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          aria-label="모바일 메뉴"
          className="flex flex-col gap-1 border-t border-black/5 px-5 py-4 md:hidden dark:border-white/10"
        >
          <Link
            className="rounded-xl px-3 py-3 text-sm hover:bg-muted"
            href="/experience"
          >
            Experience
          </Link>
          <a
            className="rounded-xl px-3 py-3 text-sm hover:bg-muted"
            href={profile.github}
          >
            GitHub
          </a>
          <a
            className="rounded-xl px-3 py-3 text-sm hover:bg-muted"
            href={profile.blog}
          >
            Blog
          </a>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#10152b] text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="mb-5 text-2xl font-semibold tracking-[-0.06em]">
              KJH<span className="text-[#a4b2f7]">.</span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-white/55">
              Security-minded, always learning.
              <br />
              복잡한 시스템을 더 안전하게 만드는 기록.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-8 text-sm sm:grid-cols-2">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Explore
              </p>
              <div className="flex flex-col gap-3 text-white/65">
                <Link href="/">Home</Link>
                <Link href="/experience">Experience</Link>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Connect
              </p>
              <div className="flex flex-col gap-3 text-white/65">
                <a href={profile.github}>GitHub</a>
                <a href={profile.blog}>Blog</a>
                <a href={`mailto:${profile.email}`}>Email</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <span>© 2026 김정현</span>
        </div>
      </div>
    </footer>
  )
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-[11px] font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ExperienceCard({
  item,
  featured = false,
}: {
  item: Experience
  featured?: boolean
}) {
  return (
    <Link
      href={
        item.type === 'Project'
          ? `/project/${item.slug}`
          : `/project/${item.slug}`
      }
      className={cn(
        'group block overflow-hidden rounded-3xl border border-black/8 bg-card transition duration-300 hover:-translate-y-1 hover:border-[#233067]/25 hover:shadow-[0_24px_70px_-28px_rgba(35,48,103,0.45)] dark:border-white/10',
        featured && 'min-h-[330px]',
      )}
    >
      <div
        className={cn(
          'relative flex min-h-36 items-end overflow-hidden bg-gradient-to-br p-6',
          item.accent,
        )}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(135deg, transparent 35%, rgba(255,255,255,.35) 35%, transparent 36%, transparent 60%, rgba(255,255,255,.15) 60%, transparent 61%)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative flex w-full items-end justify-between">
          <Badge className="bg-white/15 text-white backdrop-blur-sm">
            {formatType(item.type)}
          </Badge>
          <ArrowUpRightIcon />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {item.period}
          </span>
          <span className="text-muted-foreground transition group-hover:translate-x-1">
            <ArrowRight className="size-4" />
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-[-0.04em]">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-7 text-muted-foreground">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} className="bg-muted text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
function ArrowUpRightIcon() {
  return (
    <ArrowDownRight className="size-6 rotate-[-45deg] text-white/75 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
  )
}

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <section
          id="about"
          className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.7fr_1.3fr] lg:px-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233067] dark:text-[#b9c4ff]">
              01 / About me
            </p>
            <h2 className="mt-5 max-w-sm text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              보안을 공부하고,
              <br />
              시스템을 이해합니다.
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-9 tracking-[-0.02em] text-foreground/80 sm:text-2xl">
              정보보호학을 전공하며 차량 네트워크와 시스템 취약점 분석을
              공부하고 있습니다.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              작게 재현하고, 정확히 기록하고, 실제 환경에서 작동하는 방어를
              설계하는 것을 중요하게 생각합니다. 복잡한 시스템을 더 안전한
              방향으로 개선하는 과정을 좋아합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Vehicle Security',
                'ECU Security',
                'System Hacking',
                'Vulnerability Research',
                'Secure Software Development',
              ].map((item) => (
                <Badge
                  key={item}
                  className="border border-[#233067]/15 bg-[#f0f2ff] text-[#233067] dark:bg-[#233067]/25 dark:text-[#c6d0ff]"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>
        <Skills />
        <Featured />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#10152b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(129,148,255,0.35),transparent_28%),radial-gradient(circle_at_5%_95%,rgba(35,48,103,0.6),transparent_38%)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="relative mx-auto grid min-h-[650px] max-w-6xl items-end gap-16 px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:grid-cols-[1.25fr_0.75fr] lg:px-10">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            Security engineer in training · 2025
          </p>
          <h1 className="max-w-4xl whitespace-pre-line text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[clamp(4rem,7vw,7.25rem)]">
            차량 보안의 경계를
            <br />
            <span className="bg-gradient-to-r from-[#b9c4ff] to-white bg-clip-text text-transparent">
              더 단단하게
            </span>
            <br />
            만듭니다.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-8 text-white/60 sm:text-lg">
            정보보호학전공
            <br />
            차량 보안 솔루션 엔지니어 목표
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#10152b] transition hover:bg-[#dfe4ff]"
            >
              GitHub <ExternalLink className="size-4" />
            </a>
            <a
              href={profile.blog}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-white/50"
            >
              Blog <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="border-l border-white/15 pl-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Currently learning
            </p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.04em]">
              Vehicle & system
              <br />
              security
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['CAN', 'UDS', 'Linux'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-20 flex items-center gap-3 text-xs text-white/40">
              <ArrowDownRight className="size-4" />
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-black/5 bg-[#f7f8fb] dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233067] dark:text-[#b9c4ff]">
              02 / Skills
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              도구는 목적을 위해
              <br />
              선택합니다.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            기초를 깊게 이해하고, 문제에 맞는 도구를 조합합니다.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10">
          {Object.entries(skills).map(([group, items], index) => (
            <div key={group} className="bg-card p-6 sm:p-7">
              <span className="text-xs font-semibold text-[#233067] dark:text-[#b9c4ff]">
                0{index + 1}
              </span>
              <h3 className="mt-7 text-lg font-semibold">{group}</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
                {items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  return (
    <section
      id="featured"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233067] dark:text-[#b9c4ff]">
              03 / Selected work
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              만든 것, 기록한 것.
            </h2>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#233067] dark:text-[#b9c4ff]"
          >
            모든 경험 보기 <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((item) => (
            <ExperienceCard key={item.slug} item={item} featured />
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-[#233067] px-7 py-12 text-white sm:px-12 sm:py-16">
        <div className="absolute -right-20 -top-24 size-72 rounded-full border-[40px] border-white/10" />
        <div className="relative max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b9c4ff]">
            Let&apos;s connect
          </p>
          <h2 className="mt-5 whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">
            함께 안전한 시스템을
            <br />
            만들고 싶다면
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/65">
            새로운 프로젝트, 보안 연구, 또는 커피챗에 대해 이야기해 주세요.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#233067] transition hover:bg-[#e6eaff]"
          >
            연락하기 <Mail className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function ExperiencePage() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233067] dark:text-[#b9c4ff]">
            Experience / 2022 — present
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
            모든 경험을
            <br />한 곳에 기록합니다.
          </h1>
          <p className="mt-7 text-base leading-8 text-muted-foreground">
            프로젝트부터 발표, 교육까지 보안 엔지니어로 성장해온 모든 기록을 한
            곳에 모았습니다.
          </p>
        </div>
        <ExperienceBrowser />
      </main>
      <Footer />
    </>
  )
}

function ExperienceBrowser() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'All' | ExperienceType>('All')
  const results = useMemo(
    () => getVisibleExperiences(query, type),
    [query, type],
  )
  return (
    <div className="mt-16">
      <div className="flex flex-col gap-4 border-y border-black/8 py-5 dark:border-white/10 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            aria-label="경험 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="제목, 태그, 기술 스택 검색"
            className="h-12 w-full rounded-xl border border-black/8 bg-background pl-11 pr-4 text-sm outline-none ring-[#233067] transition placeholder:text-muted-foreground focus:ring-2 dark:border-white/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {experienceTypes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item)}
              className={cn(
                'rounded-full border px-3 py-2 text-xs transition',
                type === item
                  ? 'border-[#233067] bg-[#233067] text-white'
                  : 'border-black/8 text-muted-foreground hover:border-[#233067]/40 dark:border-white/10',
              )}
            >
              {item === 'All' ? '전체' : formatType(item)}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {results.length}개의 기록
      </p>
      <div className="relative mt-8 flex flex-col gap-0">
        {results.map((item) => (
          <ExperienceRow key={item.slug} item={item} />
        ))}
        {results.length === 0 && (
          <div className="rounded-3xl border border-dashed p-12 text-center">
            <p className="font-medium">검색 결과가 없습니다</p>
            <p className="mt-2 text-sm text-muted-foreground">
              다른 검색어 또는 필터를 사용해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function ExperienceRow({ item }: { item: Experience }) {
  return (
    <Link
      href={`/project/${item.slug}`}
      className="group grid gap-4 border-b border-black/8 py-7 transition hover:bg-muted/35 sm:grid-cols-[120px_130px_1fr_auto] sm:items-center dark:border-white/10"
    >
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {item.period}
      </span>
      <span
        className="w-fit rounded-full px-3 py-1 text-[11px] font-medium"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        {formatType(item.type)}
      </span>
      <div>
        <h2 className="text-xl font-semibold tracking-[-0.035em]">
          {item.title}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <ArrowRight className="hidden size-5 text-muted-foreground transition group-hover:translate-x-1 sm:block" />
    </Link>
  )
}

export function ProjectPage({ item }: { item: Experience }) {
  const details = item.details
  return (
    <>
      <Header />
      <main
        id="main"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowRight className="size-4 rotate-180" /> 목록으로 돌아가기
        </Link>
        <div className="mt-14 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <span className="inline-flex rounded-full bg-[#e8edff] px-3 py-1 text-xs font-medium text-[#233067] dark:bg-[#233067]/30 dark:text-[#b9c4ff]">
              {formatType(item.type)}
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.15em] text-muted-foreground">
              {item.period}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} className="bg-muted text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#233067] dark:text-[#b9c4ff]"
              >
                View repository <GitBranch className="size-4" />
              </a>
            )}
          </aside>
          <div className="min-w-0">
            <div
              className={cn(
                'relative min-h-52 overflow-hidden rounded-3xl bg-gradient-to-br p-8',
                item.accent,
              )}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, transparent 35%, rgba(255,255,255,.35) 35%, transparent 36%, transparent 60%, rgba(255,255,255,.15) 60%, transparent 61%)',
                  backgroundSize: '26px 26px',
                }}
              />
              <p className="relative max-w-lg text-2xl font-medium leading-snug tracking-[-0.03em] text-white">
                {item.description}
              </p>
            </div>
            <div className="mt-12 flex flex-col gap-12">
              {details ? (
                <>
                  <DetailBlock title="프로젝트 소개">
                    <p>{item.description}</p>
                  </DetailBlock>
                  <DetailBlock title="문제 정의">
                    <p>{details.problem}</p>
                  </DetailBlock>
                  <DetailBlock title="담당 역할">
                    <p>{details.role}</p>
                  </DetailBlock>
                  <DetailBlock title="구현 내용">
                    <ul>
                      {details.implementation.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </DetailBlock>
                  <DetailBlock title="Security Considerations" accent>
                    <ul>
                      {details.security.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </DetailBlock>
                  <DetailBlock title="배운 점">
                    <p>{details.takeaway}</p>
                  </DetailBlock>
                </>
              ) : (
                <DetailBlock title="기록">
                  <p>{item.description}</p>
                  <p className="mt-5">
                    이 경험에 대한 상세 노트는 콘텐츠 모델이 확장될 때 함께
                    업데이트됩니다.
                  </p>
                </DetailBlock>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
function DetailBlock({
  title,
  children,
  accent = false,
}: {
  title: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <section
      className={cn(
        'border-t pt-6',
        accent ? 'border-[#233067]/30' : 'border-black/10 dark:border-white/10',
      )}
    >
      <h2
        className={cn(
          'text-xs font-semibold uppercase tracking-[0.18em]',
          accent
            ? 'text-[#233067] dark:text-[#b9c4ff]'
            : 'text-muted-foreground',
        )}
      >
        {title}
      </h2>
      <div className="mt-5 text-base leading-8 text-foreground/80 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['—']">
        {children}
      </div>
    </section>
  )
}

export function AdminPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233067] dark:text-[#b9c4ff]">
            Protected route / Admin
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
            콘텐츠를
            <br />
            안전하게 관리하세요.
          </h1>
          <p className="mt-7 text-base leading-8 text-muted-foreground">
            관리자 기능은 MongoDB Atlas API와 검증된 Route Handler를 통해 배포
            환경에서도 콘텐츠를 안전하게 유지하도록 구조를 분리했습니다.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Projects
            </p>
            <p className="mt-4 text-4xl font-semibold">03</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Experiences
            </p>
            <p className="mt-4 text-4xl font-semibold">07</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Storage
            </p>
            <p className="mt-4 text-lg font-semibold">Vercel Blob</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Database
            </p>
            <p className="mt-4 text-lg font-semibold">Prisma + SQLite</p>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-dashed p-7">
          <div className="flex items-start gap-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8edff] text-[#233067] dark:bg-[#233067]/30 dark:text-[#b9c4ff]">
              <GitBranch className="size-4" />
            </div>
            <div>
              <h2 className="font-semibold">Production integration point</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                이 화면은 관리자 라우트의 구조와 콘텐츠 모델을 보여주는
                진입점입니다. 실제 배포에서는 Auth.js Credentials Provider로
                보호하고, Experience CRUD를 Server Actions와 Zod로 연결하세요.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233067] dark:text-[#b9c4ff]">
          404 / Not found
        </p>
        <h1 className="mt-6 text-6xl font-semibold tracking-[-0.07em] sm:text-8xl">
          찾을 수<br />
          없습니다.
        </h1>
        <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#233067] px-5 py-3 text-sm font-medium text-white"
        >
          홈으로 돌아가기 <ArrowRight className="size-4" />
        </Link>
      </main>
      <Footer />
    </>
  )
}
