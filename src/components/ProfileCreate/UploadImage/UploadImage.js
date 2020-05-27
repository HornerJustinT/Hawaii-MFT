import React,{ Component } from 'react';


class UploadImage extends Component{

    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/practice')
    }

    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/profileReview')
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
export default UploadImage;