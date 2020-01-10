//dependencies--external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spin from 'antd/lib/spin';
import {DebounceInput} from 'react-debounce-input';

import * as BookAPI from '../../api/BooksAPI'
import { removeWhiteSpace } from '../../utils/tests/string'
import Item from './item/Item'

import './search.css'

class Search extends Component {

    state = {
        query: '',
        results: [],
        isEmpty: false,
        isLoading: false,
    }

    handleInputChange = (e) => {
        this.setState({query: e.target.value})
        this.findBooks(e.target.value);
    }

    findBooks = (query) => {
        query = removeWhiteSpace(query)
        if(query.trim()=== ' '){
            this.setState({results: [], isEmpty: false, isLoading: false})
            return;
        }

        this.setState({results: [ ], isEmpty: false, isLoading: true})

        BookAPI.search(query)
        .then((response) =>{
            if(query !== removeWhiteSpace(this.state.query)) return

            const emptyResponse = !!response.error
            const results = emptyResponse ? [] : response

            results.forEach(item => {
                const myBook = this.props.myBooks.find(elem => elem.id === item.id)
                if (myBook) item.shelf = myBook.shelf
            })
            this.setState({results, isEmpty: emptyResponse, isLoading: false})
        });
    }

    render () {
        const { isEmpty, isLoading } = this.state

        return (
            <div className="search-container">
                <h1>Search Page</h1>

                <DebounceInput
                    placeholder="Search by Title"
                    onChange={this.handleInputChange}
                    value={this.state.query}
                    minLength={1}
                    debounceTimeout={1}
                 />
                {isLoading && (
                    <div className="results-loading">
                        <Spin size="small"/>
                        </div>
                )}

                {isEmpty && (
                    <div className="no-results">
                        No Results Were found
                    </div>
                )}

                {this.state.results.length > 0 &&(
                    <div className="results-details">
                        <b>{this.state.results.length}</b> 
                       Results
                       </div>
                )}

                <ul className="results">
                    {this.state.results.map((book, index) => (
                        <Item key={book.id} data={book} onUpdateBook={this.props.onUpdateBook}/>
                    ))}
                </ul>
            </div>
        )
    }
}
Search.defaultProps ={
    myBooks: [],
    onUpdateBook: () => {}
}
Search.propTypes = {
    myBooks: PropTypes.array,
    onUpdateBook: PropTypes.func
}
export default Search