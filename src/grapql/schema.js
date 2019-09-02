import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import getEntity from '../data';

const Article = new GraphQLObjectType({
  name: "Article",
  fields: {
    id: {
      type: GraphQLID
    },
    slug: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      getArticle: {
        type: Article,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve: (root, args, context, info) => getEntity("article", args.id)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      updateAticleSlug: {
        type: Article,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          },
          slug: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, args, context, info) => {
          const article = getEntity("article", args.id);
          if (!article) throw new Error(`Article ${args.id} not found`);

          article.slug = args.slug;
          return article;
        }
      }
    }
  })
})

export default schema;
