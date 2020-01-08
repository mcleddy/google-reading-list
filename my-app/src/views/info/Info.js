//dependencies--external
import React, { PureComponent } from 'react';
import Link from 'react-router-dom/Link'
import withRouter from 'react-router/withRouter'
import Spin from "antd/lib/spin"

//dependencies--internal
import * as BooksAPI from '../../api/BooksAPI'

//import style
import './info.css'

class Info extends PureComponent {
    state = {
        book: {},
        isLoading: false,
        error: false
    }
    componentDidMount =() =>{
        const { match }= this.props
        const id = match.params.id
        this.setState({isLoading: true})

        BooksAPI.get(id)
            .then(response => {
                this.setState({book: response, isLoading: false, error: false})
            })
            .catch(error =>{
                this.setState({book: {}, isLoading: false, error: `ID (${id}) not found`})
            })
    }
    render () {
        const { book }= this.state

        const errorContainer= (
            <div className = 'error'>
                <h1>Error: Book not found</h1>
                <Link to='/'>Home</Link>
            </div>
            )
            const loadingContainer = (
                <div className='loading'>
                    <Spin />Loading...
                </div>
            )

            const bookContainer = (
                <div className='info-book'>
                    <h1>Book / {book.title}</h1>
                    <p>{book.subtitle}</p>
                    <p>{book.description}</p>
                    <p><b>PubDate: </b>{book.publishedDate}</p>
                    <p><b>Author(s): </b>{book.authors}</p>
                    <p><b>Pages: </b>{book.pageCount}</p>

                    <div>
                        <a href={book.previewLink} className='btn' target="_blank" rel="noopener noreferrer">
                            More Info
                        </a>
                        <Link to='/' className='btn'>Home</Link>
                    </div>
                </div>
            )

            let content;
            if (this.state.error){
                content = errorContainer
            } else if(this.state.isLoading){
                content = loadingContainer
            } else {
                content= bookContainer
            }
            return (
                <div>
                    {content}
                </div>
            )
    }
}
export default withRouter(Info);