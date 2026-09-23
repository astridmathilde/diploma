import Link from 'next/link';
import { formatDate } from '@/lib/date';
import { getPosts } from '@/sanity/lib/data';
import IconExternal from "@/components/icons/icon-external";
import { siteTitle } from '../layout';
import "@/assets/scss/global.scss";

export default async function PageLayout({ children }) {
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
    <>
    <header>
    <h1>{siteTitle}</h1>
    <p>A diploma project by <a href="https://astridmathilde.no" rel="external" target="_blank">Astrid Mathilde Boberg</a>.<br />The Oslo School of Architecture and Design, Spring 2027.</p>
    
    {categories.map((category) => (
      <div key={category.slug}>
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
      </div>
    ))}
    
    <div key="resources">
    <h2>Resources</h2>
    <ul className="resources">
    <li><a href="https://www.are.na/astrid-mathilde-boberg/my-diploma-research" rel="external" target="_blank">Research</a> <IconExternal /></li>
    <li><a href="https://www.are.na/astrid-mathilde-boberg/my-diploma-tools-methods" rel="external" target="_blank">Tools & methods</a> <IconExternal /></li>
    </ul>
    </div>
    </header>
    
    {children}
    </>
  );
}
