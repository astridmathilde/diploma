import {defineQuery} from 'next-sanity'

/* POSTS */
export const POSTS_QUERY = defineQuery(
  `*[_type == "post"
  && defined(category->slug.current)
  && !(_id in path("drafts.**"))] | order(publishedAt desc){
  _id, title, publishedAt, _updatedAt, "slug": slug.current,
  "category": category->{"slug": slug.current, name}
  }`
)

export const POST_QUERY = defineQuery(
  `*[_type == "post"
  && slug.current == $slug
  && category->slug.current == $category
  && !(_id in path("drafts.**"))][0]{
  title, publishedAt, _updatedAt,
  "content": content[]{
    ...,
    markDefs[]{
      ...,
      _type == "link" && defined(reference) => {
        "reference": reference->{
          "category": category->slug.current,
          "slug": slug.current
        }
      }
    }
  }
  }`
)
