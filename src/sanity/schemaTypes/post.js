import {defineField, defineType} from 'sanity'
import {client} from '../client'
import {blockContent} from './blockContent'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('A post needs a title'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().error('A post needs a slug'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      initialValue: async () => {
        try {
          const categoryId = await client.fetch(
            '*[_type == "category" && name == "Thoughts"][0]._id'
          )
          return categoryId ? {_type: 'reference', _ref: categoryId} : {}
        } catch {
          return {}
        }
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date published',
      type: 'date',
      initialValue: () => new Date().toISOString().substring(0, 10),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {title: 'title', published: 'publishedAt'},
    prepare({title, published}) {
      return {title, subtitle: published ? `published ${published}` : undefined}
    },
  },
})
