import React, { Component } from 'react';

//React-bootstrap imports
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

class NewRegistration extends Component {

    render(){
        return(
            <>
            <Button >Register New User</Button>
            </>
        );
    }
}


//Maybe don't need this?
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(NewRegistration);
