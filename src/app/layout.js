import { ThemeProvider } from "next-themes";
import "@/assets/scss/global.scss";
import localFont from 'next/font/local';
import IconExternal from "@/components/icons/icon-external";

export const metadata = {
  title: {
    default: "Designing Calm: Tools for digital minimalism",
    template: "%s – Designing Calm: Tools for digital minimalism",
  },
  description: "A diploma project by Astrid Mathilde Boberg, The Oslo School of Architecture and Design",
};

const apercu = localFont({
  src: [
    {
      path: '../assets/fonts/Apercu-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Apercu-Italic.woff2',
      weight: '400',
      style: 'italic',
    }
  ]
});

import Link from 'next/link';

import { formatDate } from '@/lib/date';
import { getPosts } from '@/sanity/lib/data';

export default async function RootLayout({ children }) {
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
    <html lang="en" className={apercu.className} suppressHydrationWarning>
    <body>
    <ThemeProvider>
    <header>
    <h1>Designing calm: Tools for digital minimalism</h1>
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
    
    <main>
    {children}
    </main>
    </ThemeProvider>
    </body>
    </html>
  );
}
