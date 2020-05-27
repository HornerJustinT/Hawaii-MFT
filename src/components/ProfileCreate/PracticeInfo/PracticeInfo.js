import React,{ Component } from 'react';


class PracticeInfo extends Component{

    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/contact')
    }

    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/uploadImage')
    }

    render (){
        return(
            <>
            <button onClick={this.handleBack}>Back</button>
            <button onClick={this.handleNext}>Next Page</button>

            </>
        )
    }

}
export default PracticeInfo;