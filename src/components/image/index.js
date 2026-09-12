import {getImageDimensions} from '@sanity/asset-utils'
import {urlFor} from '@/sanity/lib/image'

const MAX_WIDTH = 1200

export default function BlockImage({value}) {
  if (!value?.asset?._ref) return null

  const {width, height} = getImageDimensions(value)
  const scaledHeight = Math.round((height / width) * MAX_WIDTH)

  return (
    <figure>
      <img
        src={urlFor(value).width(MAX_WIDTH).url()}
        alt={value.alt ?? ''}
        width={MAX_WIDTH}
        height={scaledHeight}
        loading="lazy"
      />
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  )
}
