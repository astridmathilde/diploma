import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      description: 'Displayed as the main heading in the site header and in the browser tab',
      type: 'string',
      validation: (rule) => rule.required().error('The site needs a title'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'Short tagline shown as the first line of the site description and appended to the meta title',
      type: 'string',
      validation: (rule) => rule.required().error('The site needs a subtitle'),
    }),
    defineField({
      name: 'description',
      title: 'Site description',
      description: 'Shown in the site header below the subtitle and used as the meta description for search engines',
      type: 'blockContent',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      description: 'Links listed in the site header, either to an external URL or to an uploaded file',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required().error('A resource needs a label'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'External link to the resource',
              type: 'url',
            }),
            defineField({
              name: 'file',
              title: 'File',
              description: 'Uploaded file to link to instead of an external URL',
              type: 'file',
            }),
          ],
          validation: (rule) =>
            rule.custom((value) => {
              const chosen = [
                Boolean(value?.url),
                Boolean(value?.file?.asset?._ref),
              ].filter(Boolean).length
              if (chosen === 0) {
                return 'Add an external URL or upload a file'
              }
              if (chosen > 1) {
                return 'Choose only one: external URL or file'
              }
              return true
            }),
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      description: 'Text shown in the footer',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Site settings'}
    },
  },
})
