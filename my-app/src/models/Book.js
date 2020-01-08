class Book {
    title
    description
    shelf
    publishedDate
    authors
    pageCount
    imageLinks
    previewedLink

    constructor(props) {
        for (var value of Object.keys(props)) {
            this[value] = props[value]
        }
    }

    static toClass (books)
}