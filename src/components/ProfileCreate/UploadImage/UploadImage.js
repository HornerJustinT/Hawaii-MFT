import React,{ Component } from 'react';


class UploadImage extends Component{

    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/practice')
    }

    handleSave = (event) => {
        event.preventDefault()

    }

    handleSubmit = (event) => {
        event.preventDefault()
        
    }

    render (){
        return(
            <>
            <div className='container'>
<header><h1>Upload an image</h1></header>
   <br/>
   <br/>
   <img src=''></img>
   <br/>
   <br/>
   <button>Add a Photo</button>
   <br/>
   <br/>
    <button onClick={this.handleBack}>Back</button>
    <button onClick={this.handleSave}>Save</button>
    <button onClick={this.handleSubmit}>Next Page</button>

            </div>

            </>
        )
    }

}
export default UploadImage;