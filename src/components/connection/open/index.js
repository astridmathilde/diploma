'use client'

import Link from 'next/link'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useRef, useTransition} from 'react'

export default function OpenConnection({category, slug, depth = 0, children}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const focusTarget = useRef(null)
  const scrollTarget = useRef(null)
  const pair = `${category}/${slug}`
  
  useEffect(() => {
    if (isPending || !scrollTarget.current) return
    const target = document.getElementById(scrollTarget.current)
    scrollTarget.current = null
    if (!target) return
    if (focusTarget.current) {
      focusTarget.current = null
      target.focus({preventScroll: true})
    }
    target.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
  }, [isPending])
  
  return (
    <Link
    href={`/${pair}`}
    onClick={(event) => {
      if (!window.matchMedia('(min-width: 540px)').matches) return
      event.preventDefault()
      const existing = (searchParams.get('connection') ?? '').split(',').filter(Boolean)
      const open = existing.indexOf(pair)
      const next = open !== -1
      ? existing.slice(0, open + 1)
      : [...existing.slice(0, depth), pair]
      if (next.length === existing.length && next.every((p, i) => p === existing[i])) return
      const target = `title-${category}-${slug}`
      scrollTarget.current = target
      if (event.detail === 0) {
        focusTarget.current = target
      }
      startTransition(() => {
        router.push(`${pathname}?connection=${next.join(',')}`, {scroll: false})
      })
    }}
    >
    {children}
    </Link>
  )
}