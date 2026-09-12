import {cache} from 'react'
import {sanityFetch} from '../client'
import {POST_QUERY, POSTS_QUERY} from './queries'

/* POSTS */
export const getPost = cache(async (category, slug) => {
    const result = await sanityFetch({
    query: POST_QUERY,
    params: {slug, category},
    revalidate: 60
  });
  return result;
})


export const getPosts = cache(async () => {
  const result = await sanityFetch({
    query: POSTS_QUERY,
    tags: ['post']
  });
  return result;
})