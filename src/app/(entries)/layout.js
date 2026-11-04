import { formatDate } from '@/lib/date';
import IconExternal from "@/components/icons/icon-external";
import Link from "next/link";
import { PortableText } from 'next-sanity';

import { components } from "@/components/entry";
import { getPosts, getSiteSettings } from "@/sanity/lib/data";
import {
  siteDescriptionDefault,
  siteFooterDefault,
  siteResourcesDefault,
  siteSubtitleDefault,
  siteTitleDefault,
} from "@/sanity/lib/defaults";
import "@/assets/scss/global.scss";

const inlineComponents = (blocks) => {
  const base = components(0)
  return {
    ...base,
    block: ({children, index}) => (
      <>
      {children}
      {index < blocks.length - 1 ? <br /> : null}
      </>
    ),
  }
}

export default async function PageLayout({ children }) {
  const posts = await getPosts()
  const settings = await getSiteSettings()

  const title = settings?.title || siteTitleDefault
  const subtitle = settings?.subtitle || siteSubtitleDefault
  const description = settings?.description?.length
    ? settings.description
    : siteDescriptionDefault
  const resources = settings?.resources?.length
    ? settings.resources
    : siteResourcesDefault
  const footer = settings?.footer?.length ? settings.footer : siteFooterDefault

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
    Math.max(...category.posts.map((post) => new Date(post.publishedAt ?? 0).getTime()))
  
  categories.sort((a, b) => lastUpdated(b) - lastUpdated(a))
  
  return (
    <>    
    <div className="columns">
    <header id="site-header">
    <h1>{title}</h1>
    <Link href="/" className="back mono"><span role="img" aria-hidden="true">{"<"} </span>Back to index</Link>
    <div className="header-content">
    <p>{subtitle}.<br /><PortableText value={description} components={inlineComponents(description)} /></p>
    
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
    {resources.map((resource) => (
      <li key={resource._key ?? resource.url}>
      <a href={resource.fileUrl || resource.url} rel="external" target="_blank">{resource.label}</a> <IconExternal />
      </li>
    ))}
    </ul>
    </div>
    </div>
    </header>

    {children}
    </div>

    <footer id="site-footer" className="mono">
    <PortableText value={footer} components={inlineComponents(footer)} />
    </footer>
    </>
  );
}
