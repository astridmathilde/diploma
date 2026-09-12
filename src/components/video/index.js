'use client'

import {getFileAsset} from '@sanity/asset-utils'
import {client} from '@/sanity/client'

const MIME_TYPES = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  m4v: 'video/x-m4v',
}

export default function BlockVideo({value}) {
  if (!value?.asset?._ref) return null

  const setVideoRef = (el) => {
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? el.play() : el.pause()),
      {threshold: 0.5}
    )
    observer.observe(el)
    return () => observer.disconnect()
  }

  const fileAsset = getFileAsset(value.asset, {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
  })
  const url = typeof fileAsset === 'string' ? fileAsset : fileAsset.url ?? ''
  const type = MIME_TYPES[fileAsset?.extension] ?? 'video/mp4'

  return (
    <video controls autoPlay muted playsInline loop ref={setVideoRef}>
      <source src={url} type={type} />
    </video>
  )
}
