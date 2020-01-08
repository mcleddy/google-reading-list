import BookModel from '../models/Book';
const api = "https://reactnd-books-api.udacity.com"

let token = localStorage.token
if (!token)
token= localStorage.token=Math.random().toString(35).substr(-8)

const headers={
    'Accept' : 'application/json',
    'Authorization' : token
}

export const get = (bookId) =>
fetch(`${api}/books/${bookId}`, { headers })
.then(res => res.json())
.then(data => {
    return BookModel.toClass(data.book)
})

export const getAll = ()=>
fetch(`${api}/books`, { headers })
.then(res=> res.json())
.then(data => BookModel.toClass(data.books))

export const update = (book, shelf) =>
fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
        ...headers,
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ shelf })
}).then(res => res.json())

export const search = (query) =>
fetch(`${api}/search`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
}).then(res => res.json())
.then(data => BookModel.toClass(data.books))