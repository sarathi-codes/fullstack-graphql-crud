const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID,GraphQLInt,GraphQLList, GraphQLString, GraphQLSchema } = graphql;

var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1', bookId: "1" },
    { name: 'Brandon Sanderson', age: 42, id: '2', bookId: "2" },
    { name: 'Terry Pratchett', age: 66, id: '3', bookId: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    // field function will return an object
    id: { type: GraphQLID }, // GraphQLID means you can send id as string or number "1" or 1
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
        type: AuthorType,
        resolve(parent, args){
            console.log("parent==>", parent); // when you access book(id: 3) : parent: { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' }
            return authors.find(a => a.id === parent.authorId);
        }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      // field function will return an object
      id: { type: GraphQLID }, // GraphQLID means you can send id as string or number "1" or 1
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books:{
        type:  new GraphQLList(BookType), // because it will return List of BookType: [Book]
        resolve(parent, args){
            return books.filter(b => b.authorId == parent.id);
        }
      }
    }),
  });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books;
      }
    },
    book: { 
      //front end query looks like book(id: "12"){name: , genre: }
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return books.find(b => b.id === args.id)
      },
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(){
        return authors;
      }
    },
    author:{
        type: AuthorType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args){
            return authors.find(a => a.id === args.id);
        }
    }
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
