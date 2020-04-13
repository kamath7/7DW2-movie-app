import React from 'react'

function Search(props) {
    return (
        <div>
            <section className="searchbox-wrap">
                <input type="text" placeholder="Search for a movie" className="searchBox" onChange={props.handleInput} onKeyPress={props.search} />
            </section>
        </div>
    )
}

export default Search;
