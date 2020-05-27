import React,{ Component } from 'react';


class ProfileReview extends Component{

    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/uploadImage')
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
    }

    render (){
        return(
            <>
            <button onClick={this.handleBack}>Back</button>
            <button onClick={this.handleSubmit}>Submit</button>

            </>
        )
    }

}
export default ProfileReview;