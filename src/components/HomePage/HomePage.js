import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar'


class HomePage extends Component{
    render(){
        return(
            <div>
                <div>
                    <p>
                        Here is HomePage with Search Bar and everything!
                    </p>
                </div>
                <SearchBar />
            </div>
        );
    }
}

export default HomePage;
