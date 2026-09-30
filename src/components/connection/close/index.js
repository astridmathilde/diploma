'use client'

import Link from 'next/link'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useRef, useTransition} from 'react'

export default function CloseConnection({category, slug, title}) {
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
  
  const existing = (searchParams.get('connection') ?? '')
  .split(',')
  .filter(Boolean)
  
  const remaining = existing.slice(0, existing.indexOf(pair))
  
  const href = remaining.length
  ? `${pathname}?connection=${remaining.join(',')}`
  : pathname
  
  return (
    <Link
    href={href}
    aria-label={`Close: ${title}`}
    onClick={(event) => {
      event.preventDefault()
      const target = remaining.length
      ? `title-${remaining[remaining.length - 1].replace('/', '-')}`
      : `title-${pathname.slice(1).replace('/', '-')}`
      scrollTarget.current = target
      if (event.detail === 0) {
        focusTarget.current = target
      }
      startTransition(() => {
        router.push(href, {scroll: false})
      })
    }}
    >
    Close
    </Link>
  )
}