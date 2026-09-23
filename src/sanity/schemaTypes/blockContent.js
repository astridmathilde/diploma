import {AsteriskIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType, DEFAULT_DECORATORS} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
      ],
      marks: {
        decorators: [
          ...DEFAULT_DECORATORS,
          {
            title: 'Superscript',
            value: 'sup',
            icon: AsteriskIcon,
            component: ({children}) => <sup>{children}</sup>,
          },
        ],
        annotations: [
          defineField({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'External URL',
                description: 'Link to another website, e.g. https://example.com',
                type: 'url',
              }),
              defineField({
                name: 'reference',
                title: 'Link to post',
                description: 'Search for a published post and link to it directly',
                type: 'reference',
                to: [{type: 'post'}],
                options: {
                  filter: '!(_id in path("drafts.**"))',
                },
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
            validation: (rule) =>
              rule.custom((value) => {
                const hasHref = Boolean(value?.href)
                const hasReference = Boolean(value?.reference?._ref)
                if (!hasHref && !hasReference) {
                  return 'Add an external URL or select a post to link to'
                }
                if (hasHref && hasReference) {
                  return 'Choose either an external URL or a post, not both'
                }
                return true
              }),
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required().error('Alt text is required for accessibility'),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      preview: {
        select: {title: 'alt', subtitle: 'caption'},
        prepare({title, subtitle}) {
          return {title: title || 'Image', subtitle}
        },
      },
    }),
    defineArrayMember({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {accept: 'video/*'},
      preview: {
        prepare: () => ({title: 'Video'}),
      },
    }),
  ],
})
