import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'
import localFont from 'next/font/local'
import Link from 'next/link'

import BlockImage from '@/components/image'
import BlockVideo from '@/components/video'
import {getPost} from '@/sanity/lib/data'
import {formatDate} from '@/lib/date'

const components = {
  types: {
    image: BlockImage,
    video: BlockVideo,
  },
  marks: {
    link: ({children, value}) => {
      const {category, slug} = value?.reference ?? {}
      if (category && slug) {
        const url = `/${category}/${slug}`
        return value?.openInNewTab ? (
          <a href={url} target="_blank" rel="noreferrer">{children}</a>
        ) : (
          <Link href={url}>{children}</Link>
        )
      }

      const href = value?.href
      if (href) {
        const external =
          !href.startsWith('/') && !href.startsWith('mailto:') && !href.startsWith('tel:')
        return (
          <a
            href={href}
            target={external || value?.openInNewTab ? '_blank' : undefined}
            rel={external ? 'noreferrer noopener' : undefined}
          >
            {children}
          </a>
        )
      }

      return <span>{children}</span>
    },
  },
}

const apercuMono = localFont({
  src:  '../../../../assets/fonts/Apercu-Mono.woff2'
});


export async function generateMetadata({params}) {
  const {category, slug} = await params
  const post = await getPost(category, slug)
  return {title: post?.title ?? 'Page not found'}
}

export default async function PostPage({params}) {
  const {category, slug} = await params
  const post = await getPost(category, slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <main>
    <article>
    <h2>{post.title}</h2>
    <PortableText value={post.content} components={components} />
    <footer>
     <p className={apercuMono.className + " mono"}>Published at <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>.<br />Last updated at <time dateTime={post._updatedAt}>{formatDate(post._updatedAt)}</time>.</p>
     <p><Link href="/">Close</Link></p>
    </footer>
    </article>
    </main>
  )
}
