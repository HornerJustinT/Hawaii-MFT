import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar'
import EmailModal from '../EmailModal/EmailModal';


class HomePage extends Component{
    render(){
        return(
            <>
            <div>
                <div>
                    <EmailModal/>
                </div>
                <SearchBar />
            </div>
            </>
        );
    }
}

export default HomePage;
