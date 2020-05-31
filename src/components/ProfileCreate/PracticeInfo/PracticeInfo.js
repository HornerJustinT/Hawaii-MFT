import React,{ Component } from 'react';
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar'


class PracticeInfo extends Component{

componentDidMount (){
    this.getSpecialization();
    this.getInsuranceTaken();
}
    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/contact-info')
    }
    handleSave = (event) => {
        event.preventDefault()
    }
    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/uploadImage')
    }
    
    getSpecialization = () =>{
        this.props.dispatch({
            type:'FETCH_SPECIALTY'
        })
    }
    getSupervisionStatus = () =>{
        this.props.dispatch({
            type:'FETCH_SUPERVISION_STATUS'
        })
    }

    getInsuranceTaken = () =>{
        this.props.dispatch({
            type:'FETCH_INSURANCE_TAKEN'
        })
    }

    render (){
        return(
            <>
            <div className='container'>
        <header><h1>Practice Info</h1></header>
        <br/>
        <ProgressBar now={75} />
        <br/>
        <label>License Type</label><br/><select><option value='' defaultValue='Select License Type'>Select License Type</option></select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>License State of Issue</label><br/><select><option value='' defaultValue='Select State of Issue'>Select State of Issue</option></select>
        <br/>
        <br/>
        <label>License Expiration Date</label><br/><input 
                  type='date'/>
        <br/>
        <br/>
        <label>Specialization</label><br/><select>
                {this.props.specialtys &&
                   
                   <>
                  
            <option value='' defaultValue='Select a Speciality'>Select a Speciality</option>
                   {this.props.specialtys.map(specialty =>
                    <option value={specialty.title}
        
                  key={specialty.id}>{specialty.id}{' '}{specialty.title}</option>
                    )}
                   </>
                   } 
            
            </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Supervision Status</label><br/><select>
                
           </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Insurance Taken</label><br/><select>
        {this.props.insuranceTaken &&    
                   <>
                  <option value='' defaultValue='Select Insurance Type'>Select Insurance Type</option>
                   {this.props.insuranceTaken.map(insurance =>
                    <option value={insurance.title}
        
                  key={insurance.id}>{insurance.id}{' '}{insurance.title}</option>
                    )}
                   </>
                   } 
            </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Are you providing telehealth?</label>
        <br/>
        <label>Yes</label><input type='radio' className='choice' value='yes'/>
        <label>No</label><input type='radio' className='choice' value='no'/>
        <br/>
        <br/>
        <label>Treatment Approaches/Preferences</label><br/><select><option value='' defaultValue='Select an Approach'>Select an Approach</option></select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Client Focus</label><br/><select><option value='' defaultValue='Select an Age Group'>Select an Age Group</option></select>
        <select><option value='' defaultValue='Select a Demographic'>Select a Demographic</option></select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Session Format(s)</label><br/><select><option value='' defaultValue='Select a Session Format'>Select a Session Format</option></select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
            <button onClick={this.handleBack}>Back</button>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleNext}>Next Page</button>

            </div>
           
            </>
        )
    }

}

const mapStateToProps = reduxstate => ({
    reduxstate,
    languages: reduxstate.languages,
    specialtys: reduxstate.specialtys,
    insuranceTaken: reduxstate.insuranceTaken,
  });
export default connect(mapStateToProps)(PracticeInfo);