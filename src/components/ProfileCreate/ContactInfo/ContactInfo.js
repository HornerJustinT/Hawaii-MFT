import React,{ Component } from 'react';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import { connect } from 'react-redux';


class ContactInfo extends Component{
// create the state
           state = {
            phone_type_id:'',
            number:'',
            island_id:'',
            email:'',
            address:'',
            languages:'',
            zip_code:'',
           }
/**
  "zip_code" INT,
  
 */
           componentDidMount (){
            this.props.dispatch({
                type:'FETCH_ISLANDS'
            })
           }
    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/create-profile')
    }

    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/practice')
    }
    handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        })
      } 

      handleSave =(event) =>{
        event.preventDefault();
        this.addContact();
        this.addZipCode();
      }
      addContact = () =>{
          this.props.dispatch({
              type:'ADD_ISLAND',
              payload:{
               island_id: this.state.island_id,
               member_id: this.props.user.id

              }
          })
      }
    
       addZipCode = () =>{
        this.props.dispatch({
            type:'ADD_ZIP_CODE',
            payload:{
                zip_code: this.state.zip_code
            }
        })
       }
    render (){
        return(
            <>
            <div className='container'>
            <header><h1>Contact Info</h1></header>
             <br/>
            <ProgressBar now={50} />
            <form onSubmit={this.handleSave}>
             <label>Island</label>
             <br/>
             <select onChange={this.handleInputChangeFor("island_id")}>
             {this.props.islands &&
                   
                   <>
                   <option defaultValue='Select your Island'>Select your Island</option>
                   {this.props.islands.map(island =>
                    <option value={island.island_id}
        
                  key={island.island_id}>{island.title}</option>
                    )}
                   </>
                   } 
             </select>
             <br/>
             <br/>
             <label>Zip Code</label>
             <br/>
             <input type="number"
                  name="zip_code"
                  value={this.state.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}/>
                <br/>
             <label>Phone Number - Business</label>
             <br/>
             <input type="number"
                  name="number"
                  value={this.state.age}
                  onChange={this.handleInputChangeFor("number")}/>
             <br/>
             <br/>
             <label>Phone Number - Personal</label>
             <br/>
             <input type="number"
                  name="number"
                  value={this.state.age}
                  onChange={this.handleInputChangeFor("number")}/>
                <br/>
             <label>Email Address - Business</label>
             <br/>
             <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
             <br/>
             <label>Email Address - Personal</label>
             <br/>
             <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
             <br/>
             <label>Website</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address - Office</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address - Home</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address - Mailing</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <br/>
            
            <button>Save</button>
            </form>
            <button onClick={this.handleBack}>Back</button>
            <button onClick={this.handleNext}>Next Page</button>

            </div>
           

            </>
        )
    }

}
const mapStateToProps = reduxstate => ({
    reduxstate,
    islands: reduxstate.islands,
    user: reduxstate.user
  });
export default connect (mapStateToProps)(ContactInfo);