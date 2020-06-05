//this component is imported into App.js and renders the initial view of the app.

import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar'


class HomePage extends Component{
    render(){
        return(
            <>
                <SearchBar />
            </>
        );
    }
}

export default HomePage;
