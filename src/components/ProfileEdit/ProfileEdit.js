import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';


//React-bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


//import CSS file
import './ProfileEdit.css';


class ProfileEdit extends Component{

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PROFILE', 
            payload: this.props.match.params,
        })
    }

    state = {
        click: false,
        prefix: '',
        firstName: '',
        lastName: '',
        age: '',
    }

    handleEdit = () => {
        this.setState({
            click: true
        });
    }

    handleSave = () => {
        this.setState({
            click: false
        });
    }

    render(){
        
        return(
            <>
            <div className="header">
                <h3>My Profile</h3>
            </div> 
                {this.state.click ? 
                    <div className="body">
                        <Button onClick={() => this.handleSave()}>Save Changes</Button>
                            <Form >
                                <Form.Group>
                                <Form.Label variant="flat" className="label">Prefix</Form.Label>
                                    <Form.Control defaultValue={this.props.profile.prefix} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control defaultValue={this.props.profile.first_name}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control defaultValue={this.props.profile.last_name}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control defaultValue={this.props.profile.age}/>
                                    <Form.Text className="text-muted">
                                        Not Listed - HIAMFT-Use Only
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                    </div>
                    :
                    <div className="body" >
                        <Button onClick={() => this.handleEdit()}>Edit Basic Info</Button>
                        <Form>
                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={this.props.profile.prefix} />                            
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={this.props.profile.first_name} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={this.props.profile.last_name} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={this.props.profile.age} />
                            </Form.Group>
                        </Form>
                    </div>
            }
                
            {/* <div>
                <Button>Edit Contact Info</Button>
            </div>

            <div>
                <Button>Edit Practice Info</Button>
            </div> */}
            </>
        );
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    user: reduxStore.user,
    profile: reduxStore.profile,
});

export default withRouter(connect(putReduxStateOnProps)(ProfileEdit));