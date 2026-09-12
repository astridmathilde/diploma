import {cache} from 'react'
import {client} from '../client'
import {POST_QUERY, POSTS_QUERY} from './queries'

/* POSTS */
export const getPost = cache(async (category, slug) => {
  try {
    return await client.fetch(POST_QUERY, {category, slug})
  } catch {
    return null
  }
})

export const getPosts = cache(async () => {
  try {
    return await client.fetch(POSTS_QUERY)
  } catch {
    return []
  }
})
