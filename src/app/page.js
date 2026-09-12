import Link from 'next/link'

import {formatDate} from '@/lib/date'
import {getPosts} from '@/sanity/lib/data'

export default async function Home() {
  const posts = await getPosts()

  const categories = []
  const bySlug = new Map()
  for (const post of posts) {
    if (!bySlug.has(post.category.slug)) {
      bySlug.set(post.category.slug, {
        slug: post.category.slug,
        name: post.category.name,
        posts: [],
      })
      categories.push(bySlug.get(post.category.slug))
    }
    bySlug.get(post.category.slug).posts.push(post)
  }

  const lastUpdated = (category) =>
    Math.max(...category.posts.map((post) => new Date(post._updatedAt ?? 0).getTime()))

  categories.sort((a, b) => lastUpdated(b) - lastUpdated(a))

  return (
    <main>
      <h1>Designing calm: Tools for digital minimalism</h1>
      <p>A diploma project by <a href="https://astridmathilde.no" rel="external" target="_blank">Astrid Mathilde Boberg</a></p>
      <p>The Oslo School of Architecture and Design, Spring 2027</p>

      {categories.map((category) => (
        <section key={category.slug}>
          <h2>{category.name}</h2>
          <ul>
            {category.posts.map((post) => (
              <li key={post._id}>
                <Link href={`/${category.slug}/${post.slug}`}>{post.title}</Link>
                {post.publishedAt ? (
                  <>
                  {' '}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
