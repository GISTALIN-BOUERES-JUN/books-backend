const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

/**
 * name - string
 * author - string
 * year of publishing - date
 * ISBN number - string
 * id - uuid
 */

const books = [{
    name: "Harry Potter and the Order of the Phoenix",
    author: "J. K. Rowling",
    year: "1994",
    ISBN: "222",
    id: uuidv4()
},{

    name: "Lord of the Rings",
    author: "J. R. R. Tolkien",
    year: "1923",
    ISBN: "333",
    id: uuidv4()

}];

app.post("/books", (request, response)=>{
    const {name, author, ISBN, year} = request.body;
    books.push({
        name,
        author,
        ISBN,
        id: uuidv4(),
        year,
    });

    return response.json(books);

})

app.get("/books/:ISBN", (request, response)=>{
    const {ISBN} = request.params;
    const book = books.find(book => book.ISBN === ISBN);

    return response.json(book);

})

app.get("/books/", (request, response)=>{
    return response.json(books);

})

app.put("/books", (request, response)=>{

    const { ISBN } = request.headers;

    const book = books.find( book => book.ISBN === ISBN);

    if(!book) {
        return response.status(400).json({ error: "Book not found"});
    };

    const { name } = request.body;

    book.name = name;
    return response.status(201).send();
});

app.delete("/books/:ISBN", (request, response)=>{

    const {ISBN} = request.params;
    const book = books.find( book => book.ISBN === ISBN);

    if(!book) {
        return response.status(400).json({ error: "Book not found"});
    }

    //splice
    books.splice(book, 1);

    return response.status(200).json(books);
})

app.listen(4000);