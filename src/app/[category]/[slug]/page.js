import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'
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
    <article>
    <h1>{post.title}</h1>
    <PortableText value={post.content} components={components} />
    <footer>
     <p>Published at <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>.<br />Last updated at <time dateTime={post._updatedAt}>{formatDate(post._updatedAt)}</time>.</p>
        <p><em>Designing Calm: Tools for digital minimalism.</em> A diploma project by <a href="https://astridmathilde.no" rel="external" target="_blank">Astrid Mathilde Boberg</a>.</p>
     <p><Link href="/">Back to index</Link></p>

   
    </footer>
    </article>
  )
}
