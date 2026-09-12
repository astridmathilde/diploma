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
    {post.publishedAt ? (
      <p>Published at <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </p>
    ) : null }
    {post._updatedAt ? (
      <p>
      Last updated at <time dateTime={post._updatedAt}>{formatDate(post._updatedAt)}</time>
      </p>
    ) : null }
        <p><em>Designing Calm: Tools for digital minimalism.</em> A diploma project by <a href="https://astridmathilde.no" rel="external" target="_blank">Astrid Mathilde Boberg</a></p>
     <p><Link href="/">Back to index</Link></p>

   
    </footer>
    </article>
  )
}
