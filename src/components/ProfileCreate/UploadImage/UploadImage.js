import React,{ Component } from 'react';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar'


class UploadImage extends Component{

    handleBack = (event) => {
        event.preventDefault();
        this.props.history.push('/practice');
    }

    handleSave = (event) => {
        event.preventDefault();

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push('/edit-profile');
    }

    render (){
        return(
            <>
            <div className='container'>
<header><h1>Upload an image</h1></header>
   <br/>
    <ProgressBar now={100} />
   <br/>
   <img src=''></img>
   <br/>
   <br/>
   <button>Add a Photo</button>
   <br/>
   <br/>
    <button onClick={this.handleBack}>Back</button>
    <button onClick={this.handleSave}>Save</button>
    <button onClick={this.handleSubmit}>I'm Done!</button>

            </div>

            </>
        )
    }

}
export default UploadImage;