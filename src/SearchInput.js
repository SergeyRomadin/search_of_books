import React, {useState} from 'react';
import BookItems from './BookItems';
import './SearchInput.css';
import LoadMoreBtn from './LoadMoreBtn';

// https://github.com/fugr-ru/frontend-javascript-test-2

const SearchInput = () => {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [lastIndex, setLastIndex] = useState(30);
    const [query, setQery] = useState('');
    const [category, setCategory] = useState('all');
    const [categoryQ, setCategoryQ] = useState('');
    const [sortingBy, setSortingBy] = useState('relevance');
    const [viewBook, setViewBook] = useState('');

    

    // const apiKey = "AIzaSyDyY5qs73NReShvEHIsRPVd2D9quIQpwrk";
    // const apiKey = "AIzaSyAnxcg0QBysDxOYAnyl-MGmui8eVzuipW4";
    

    function handleInputChange(event){
        
        setQery(event.target.value);

    };

    function getBooks (e) {
        e.preventDefault();

        // GET https://www.googleapis.com/books/v1/volumes?q={question}+inauthor:keyes&key={apiKey}
        // let url = `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&key=${apiKey}&maxResults=30`;
        let url = `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&maxResults=30`;
        
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            // console.log(responseData)
            setBooks(responseData)
            setAllBooks(responseData.items)
        })

        
    }

    function getMoreBooks () {
        // let url = `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&key=${apiKey}&maxResults=30&startIndex=${lastIndex}`;
        let url = `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}${categoryQ}&orderBy=${sortingBy}&maxResults=30&startIndex=${lastIndex}`;
        
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            // console.log(responseData)
            setAllBooks(books.items.concat(responseData.items))
            
        })

        setLastIndex(lastIndex+31)
        
    }

    function categoryChange (event) {
        setCategory(event.target.value)
        if(event.target.value === 'all'){
            setCategoryQ('')
        }else{
            setCategoryQ('+subject:'+ event.target.value)
        }
        
    }   

    function sortingChange (event) {
        setSortingBy(event.target.value)
    }

    return (
        <div className="search">
            <div className='search__container'>
                <form className="search__form" onSubmit={(e) => getBooks(e)}>
                    <input
                        type="text"
                        placeholder="Search of books..."
                        className="search__input"
                        onChange={(e) => handleInputChange(e)}
                        value={query}
                        
                    />
                    <div>
                    <label>
                        Category:
                        <select value={sortingBy} onChange={sortingChange}>
                            <option value='relevance'>relevance</option>
                            <option value='newest'>newest</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <select value={category} onChange={categoryChange}>
                            <option value='all'>all</option>
                            <option value='art'>art</option>
                            <option value='biography'>biography</option>
                            <option value='computers'>computers</option>
                            <option value='history'>history</option>
                            <option value='medical'>medical</option>
                            <option value='poetry'>poetry</option>
                        </select>
                    </label>
                    </div>

                    <input type="submit" value="Search..."/>
                </form>
            </div>
                <BookItems books={allBooks} category={category} setView={setViewBook}/>
                <LoadMoreBtn books={books} getMoreBooks={getMoreBooks} viewBook={viewBook}></LoadMoreBtn>
                {/* <button onClick={getMoreBooks}>Load more...</button> */}
               
                
                
            
        </div>
    )

}

export default SearchInput