import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        'Missing environment variable SANITY_REVALIDATE_SECRET',
        { status: 500 }
      )
    }
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true // wait for Content Lake propagation
    )
    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: 'Invalid signature', isValidSignature, body }),
        { status: 401 }
      )
    }
    if (!body?._type) {
      return new Response(
        JSON.stringify({ message: 'Bad Request', body }),
        { status: 400 }
      )
    }
    revalidateTag(body._type, null)
    return NextResponse.json({ body })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(message, { status: 500 })
  }
}