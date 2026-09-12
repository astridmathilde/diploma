import Link from 'next/link'

import {getPosts} from '@/sanity/lib/data'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main>
      <h1>Designing calm: Tools for digital minimalism</h1>
      <p>A diploma project by <a href="https://astridmathilde.no" rel="external" target="_blank">Astrid Mathilde Boberg</a></p>
      <p>The Oslo School of Architecture and Design, Spring 2027</p>

      <h2>Thoughts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/${post.category}/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
