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
            languages:''
           }
           componentDidMount (){
               this.getIslands()
           }
    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/create-profile')
    }

    handleSave = (event) => {
        event.preventDefault()
       
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

      addContact = (event) =>{
          event.preventDefault();
          this.props.dispatch({
              type:'ADD_CONTACT',
              payload:{

              }
          })
      }
      //fetch all the island names
     getIslands = () =>{
         this.props.dispatch({
             type:'FETCH_ISLANDS'
         })
     }

    render (){
        return(
            <>
            <div className='container'>
            <header><h1>Contact Info</h1></header>
             <br/>
            <ProgressBar now={50} />
            <form onSubmit={this.addContact}>
             <label>Island</label>
             <br/>
             <select>
             {this.props.islands &&
                   
                   <>
                   <option defaultValue='Select your Island'>Select your Island</option>
                   {this.props.islands.map(island =>
                    <option value={island.title}
        
                  key={island.id}>{island.id}{' '}{island.title}</option>
                    )}
                   </>
                   } 
             </select>
             <br/>
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
            
            <button onClick={this.handleSave}>Save</button>
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
    islands: reduxstate.islands
  });
export default connect (mapStateToProps)(ContactInfo);