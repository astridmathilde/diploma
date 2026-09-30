 import Link from 'next/link'
 import {PortableText} from 'next-sanity'
 
 import BlockImage from '@/components/image'
 import BlockVideo from '@/components/video'
 import OpenConnection from '../connection/open'
 import CloseConnection from '../connection/close'
 import {formatDate} from '@/lib/date'
 
 const components = (depth) => ({
   types: {
     image: BlockImage,
     video: BlockVideo,
   },
   marks: {
     sup: ({children}) => <sup>{children}</sup>,
     link: ({children, value}) => {
       const {category, slug} = value?.reference ?? {}
       if (category && slug) {
         const url = `/${category}/${slug}`
         return value?.openInNewTab ? (
           <a href={url} target="_blank" rel="noreferrer">{children}</a>
         ) : (
           <OpenConnection category={category} slug={slug} depth={depth}>{children}</OpenConnection>
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
 })

 export default function BlockEntry({post, depth = 0, isConnection = false}) {
   const connectionProps = isConnection
   ? {tabIndex: 0, 'aria-label': post.title}
   : {}
   
   return (
     <article {...connectionProps}>

     <h2 id={`title-${post.category.slug}-${post.slug}`} tabIndex={-1}>{post.title}</h2>

     <PortableText value={post.content} components={components(depth)} />

    <footer>
    <p className="mono">Published at <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>.<br />Last updated at <time dateTime={post._updatedAt}>{formatDate(post._updatedAt)}</time>.</p>

    <p>{isConnection ? (
      <CloseConnection category={post.category.slug} slug={post.slug} title={post.title} />
    ) : (
      <Link href="/">Close</Link>
    )}</p>
    </footer>
    
    </article>
  )
}
