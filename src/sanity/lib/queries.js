import {defineQuery} from 'next-sanity'

/* POSTS */
export const POSTS_QUERY = defineQuery(
  `*[_type == "post"
  && defined(category->slug.current)
  && !(_id in path("drafts.**"))] | order(publishedAt desc){
  _id, title, "slug": slug.current, "category": category->slug.current
  }`
)

export const POST_QUERY = defineQuery(
  `*[_type == "post"
  && slug.current == $slug
  && category->slug.current == $category
  && !(_id in path("drafts.**"))][0]{
  title, publishedAt, _updatedAt, content
  }`
)
