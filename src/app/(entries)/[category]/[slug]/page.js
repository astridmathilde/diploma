import {notFound} from 'next/navigation'
import {getPost} from '@/sanity/lib/data'
import BlockEntry from '@/components/entry'

export async function generateMetadata({params}) {
  const {category, slug} = await params
  const post = await getPost(category, slug)
  return {title: post?.title ?? 'Page not found'}
}

export default async function PostPage({params, searchParams}) {
  const {category, slug} = await params
  const {connection} = await searchParams
  const post = await getPost(category, slug)
  
  if (!post) {
    notFound()
  }
  
  const pairs = String(connection ?? '')
  .split(',')
  .filter(Boolean)
  .map((pair) => pair.split('/'))
  .filter((parts) => parts.length === 2 && parts.every(Boolean))
  
  const connectionPosts = await Promise.all(
    pairs.map(([category, slug]) => getPost(category, slug))
  )
  
  return (
    <main>
    <BlockEntry post={post} />
    
    {connectionPosts.map((post, i) =>
      post ? <BlockEntry key={pairs[i].join('/')} post={post} isConnection depth={i + 1} /> : null
    )}
    </main>
  )
}