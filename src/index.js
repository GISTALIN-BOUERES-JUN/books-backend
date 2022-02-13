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

const books = [];

app.post("/books", (request, response)=>{
    const {name, author, ISBN, year} = request.body;
    books.push({
        name,
        author,
        ISBN,
        id: uuidv4(),
        year,
    });

    return response.status(201).send();

})

app.get("/books/:ISBN", (request, response)=>{
    const {ISBN} = request.params;
    const book = books.find(book => book.ISBN === ISBN);

    return response.json(book);

})

app.listen(4000);