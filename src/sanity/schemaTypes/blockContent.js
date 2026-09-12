import {defineArrayMember, defineField, defineType} from 'sanity'

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
