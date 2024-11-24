export const typeDefs = `#graphQl
type Author {
    id:ID!
    name: String!
    books: [Book]!
}

type Book {
    id: ID!
    name: String!
    publishedYear:Int
    author:Author!
}

type Query {
    authors: [Author]
    books: [Book]
}
    
type Mutation {
    addBooks(name:String!, publishedYear:Int!, authorId:ID!):Book!
    removeBook(name:String!):[Book]
    addAuthor(name:String!) :[Author]
}



`;
