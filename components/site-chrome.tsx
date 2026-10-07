'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ExternalLink, Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }
  return (
    <button type="button" aria-label="테마 변경" onClick={toggle} className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 transition hover:border-[#382a10]/40 dark:border-white/15">
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
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="hidden text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground sm:block">오늘의 기록</span>
        </Link>
        <nav aria-label="사이트 주요 메뉴" className="hidden items-center gap-8 md:flex">
          <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/experience">Experience</Link>
          <a className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground" href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalLink className="size-3.5" aria-hidden="true" /></a>
          <a className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground" href={profile.blog} target="_blank" rel="noreferrer">Blog <ExternalLink className="size-3.5" aria-hidden="true" /></a>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" className="grid size-9 place-items-center rounded-full border border-black/10 dark:border-white/15" aria-label="메뉴 열기" onClick={() => setOpen(!open)}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="모바일 메뉴" className="flex flex-col gap-1 border-t border-black/5 px-5 py-4 md:hidden dark:border-white/10">
          <Link className="rounded-xl px-3 py-3 text-sm hover:bg-muted" href="/experience">Experience</Link>
          <a className="flex items-center justify-between rounded-xl px-3 py-3 text-sm hover:bg-muted" href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalLink className="size-3.5" /></a>
          <a className="flex items-center justify-between rounded-xl px-3 py-3 text-sm hover:bg-muted" href={profile.blog} target="_blank" rel="noreferrer">Blog <ExternalLink className="size-3.5" /></a>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#382a10] text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="mb-5 text-2xl font-semibold tracking-[-0.06em]">KJH<span className="text-[#eae0d7]">.</span></div>
            <p className="max-w-xs text-sm leading-7 text-white/55">Security-minded, always learning.<br />복잡한 시스템을 더 안전하게 만드는 기록.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-8 text-sm sm:grid-cols-2">
            <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Explore</p><div className="flex flex-col gap-3 text-white/65"><Link href="/">Home</Link><Link href="/experience">Experience</Link></div></div>
            <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Connect</p><div className="flex flex-col gap-3 text-white/65"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.blog} target="_blank" rel="noreferrer">Blog</a><a href={`mailto:${profile.email}`} target="_blank" rel="noreferrer">Email</a></div></div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row"><span>© 2026 김정현</span></div>
      </div>
    </footer>
  )
}
