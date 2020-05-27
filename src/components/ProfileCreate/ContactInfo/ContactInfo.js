import React,{ Component } from 'react';


class ContactInfo extends Component{

    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/CreateProfile')
    }

    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/practice')
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
export default ContactInfo;