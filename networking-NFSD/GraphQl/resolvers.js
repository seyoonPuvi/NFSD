const data = {
  books: [
    {
      id: 1,
      name: "To Kill a Mockingbird",
      publishedYear: 1960,
      authorId: 101,
    },
    { id: 2, name: "1984", publishedYear: 1949, authorId: 102 },
    { id: 3, name: "The Great Gatsby", publishedYear: 1925, authorId: 103 },
    { id: 4, name: "Pride and Prejudice", publishedYear: 1813, authorId: 104 },
    {
      id: 5,
      name: "The Catcher in the Rye",
      publishedYear: 1951,
      authorId: 105,
    },
    { id: 6, name: "The Hobbit", publishedYear: 1937, authorId: 106 },
    {
      id: 7,
      name: "Harry Potter and the Philosopher's Stone",
      publishedYear: 1997,
      authorId: 107,
    },
    {
      id: 8,
      name: "The Lord of the Rings",
      publishedYear: 1954,
      authorId: 106,
    },
    { id: 9, name: "Animal Farm", publishedYear: 1945, authorId: 102 },
    { id: 10, name: "Moby-Dick", publishedYear: 1851, authorId: 108 },
  ],

  authors: [
    { id: 101, name: "Harper Lee", booksId: [1] },
    { id: 102, name: "George Orwell", booksId: [2, 9] },
    { id: 103, name: "F. Scott Fitzgerald", booksId: [3] },
    { id: 104, name: "Jane Austen", booksId: [4] },
    { id: 105, name: "J.D. Salinger", booksId: [5] },
    { id: 106, name: "J.R.R. Tolkien", booksId: [6, 8] },
    { id: 107, name: "J.K. Rowling", booksId: [7] },
    { id: 108, name: "Herman Melville", booksId: [10] },
  ],
};

export const resolvers = {
  Author: {
    books: (parent, args, context, info) => {
      const authorId = parent.id;
      return data.books.filter((eachBook) => eachBook.authorId === authorId);
    },
  },

  Book: {
    author: (parent, args, context, info) => {
      const bookId = parent.id;
      return data.authors.find((eachAuthor) =>
        eachAuthor.booksId.includes(bookId)
      );
    },
  },

  Query: {
    authors: (parent, args, context, info) => {
      return data.authors;
    },

    books: (parent, args, context, info) => {
      return data.books;
    },
  },

  Mutation: {
    addBooks: (parent, args, context, info) => {
      const newBook = { ...args, id: data.books.length + 1 };
      data.books.push(newBook);
      return newBook;
    },
    removeBook: (parent, args, context, info) => {
      const name = args.name;
      const bookToRemoveIndex = data.books.findIndex(
        (eachBook) => eachBook.name === name
      );
      if (bookToRemoveIndex !== -1) {
        data.books.splice(bookToRemoveIndex, 1);
        return data.books;
      } else {
        return "Book not found";
      }
    },
    addAuthor: (parent, args, context, info) => {
      const newAuthor = { id: data.authors.length + 1, ...args };
      data.authors.push(newAuthor);
      return data.authors;
    },
  },
};
