import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'
import Link from 'next/link'

import BlockImage from '@/components/image'
import BlockVideo from '@/components/video'
import {getPost} from '@/sanity/lib/data'

const components = {
  types: {
    image: BlockImage,
    video: BlockVideo,
  },
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
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
    <ul>
    {post.publishedAt ? (
      <li>Date published: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></li>
    ) : null }
    {post._updatedAt ? (
      <li>Last updated: <time dateTime={post._updatedAt}>{formatDate(post._updatedAt)}</time></li>
    ) : null }
    </ul>
    <Link href="/">Back to index</Link>
    </footer>
    </article>
  )
}
