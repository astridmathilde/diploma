import {cache} from 'react'
import {sanityFetch} from '../client'
import {POST_QUERY, POSTS_QUERY, SITE_SETTINGS_QUERY} from './queries'

/* SITE SETTINGS */
export const getSiteSettings = cache(async () => {
  const result = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    revalidate: 60,
    tags: ['siteSettings']
  });
  return result;
})

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
    revalidate: false,
    tags: ['post']
  });
  return result;
})