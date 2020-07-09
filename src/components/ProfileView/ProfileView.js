import React, { Component } from "react";
import "./ProfileView.css";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import EmailModal from '../EmailModal/EmailModal'
import firebase from "../../Firebase";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper
} from "google-maps-react";

//CSS import
// import "../App/App.css";
import "./ProfileView.css";

var storage = firebase.storage().ref();
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const mapStyles = {
  position: "static",
  width: "250px",
  height: "250px"
};

class ProfileView extends Component {
  state = {
    lat: 0,
    lng: 0,
    profilePhoto: '',
  };
  
  componentDidMount() {// fetchs profile info
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: this.props.match.params,
    });
    this.getImage(this.props.match.params.id)
  }

  telehealth=(doesTelehealth)=>{
    if(doesTelehealth){
      return <>Yes I do provide telehealth</>
    }
    else{
      return <>No, I do not provide telehealth at this time</>
    }
  }
  credentials=(credentials)=>{// checks if credentials are there function
    if(credentials){
      return<ul>{this.props.profile[0].credentials.map((credentials,key) =>
        <li key={key}>{credentials}</li>)}
      </ul>
    }
  }
  website=(website)=>{// checks if website is there function
    if(website){
      return (
        <a href={this.props.profile.website}>
          {this.props.profile.website}
        </a>
      );
    }
  }

  setMAP = () => { // function that sets the map latitudes only when it was unchanged to stop infinete loop. I do not know how to set up async for when the dispatch is done.
    if (this.state.lat === 0 && this.state.lng === 0 ) {
      const url_address = encodeURI(this.props.profile.address[0] + " " + this.props.profile.city + " Hawaii " + this.props.profile.zip_code).replace(
        /%20/g,
        "+"
      );
      console.log(url_address)
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${url_address}&key=${API_KEY}`
      )
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
            if (data.results[0]) {
              this.setState({
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng,
              });
            }
          }
        );
    }
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  getImage = (id) => {
    console.log(id)
    storage
      .child(`images/${id}photo`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ profilePhoto: url});
      }).then(()=>{
        this.forceUpdate();
      })
      .catch((error) => { // if no photo found
        storage 
          .child(`images/noFile.png`)
          .getDownloadURL()
          .then((url) =>{
            this.setState({profilePhoto:url});
          }).then(()=>{
            this.forceUpdate();
          })
          .catch((error) => {
            console.log('No file found photo also not found')
          })
        // Handle any errors
      });
  }
  home = () => {
    this.props.history.push('/home')
  }

  render() {
    if (this.props.profile.first_name) {// waits for the dispatch to have finished
      this.setMAP();// sets the map
      return (
        <>
          <Button onClick={this.home} className="btn-container">
            Back to search Results
          </Button>
          <div className="border">
            <div className="flex-between row-wrap row">
              <div className="columnSide">
                <div className="row">
                  <img
                    className="profile"
                    width="200"
                    height="200"
                    src={this.state.profilePhoto}
                  />
                </div>
                <div className="row">
                  {!this.props.profile.student && (
                    <div className="emailModal">
                      <EmailModal />
                    </div>
                  )}
                </div>
              </div>

              <div className="bio-title columnThirds">
                <h1>
                  {this.props.profile.first_name} {this.props.profile.last_name}
                </h1>
                {this.props.profile.student && (
                  <h4 className="student">Student Member</h4>
                )}
                <h6 className="credentials">
                  {this.props.profile.credentials}
                </h6>
                <p>{this.props.profile.statement}</p>
                <div className="row border-top">
                  <div className="column ">
                    <h5>Treatments & Approaches</h5>
                    <ul>
                      {this.props.profile.treatment_preferences.map(
                        (treatment_preferences, key) => (
                          <li key={key}>{treatment_preferences}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="column">
                    <h5>Specialities</h5>
                    <ul>
                      {this.props.profile.specialty.map((
                        specialty,
                        key // maps through specialities of therapist
                      ) => (
                        <li key={key}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-top row">
                  <h5 className="clientFocus">Client Focus</h5>
                </div>
                <div className="row">
                  <div className="column">
                    <h5>Age Group</h5>
                    <ul>
                      {this.props.profile.ages_served.map((
                        age,
                        key // maps through the ages served by the therapist
                      ) => (
                        <li key={key}>{age}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="column">
                    <h5>Demographic Group</h5>
                    <ul>
                      {this.props.profile.client_focus.map((
                        age,
                        key // maps through the client focuses of the therapist
                      ) => (
                        <li key={key}>{age}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {!this.props.profile.student && (
                  <div className="row border-top">
                    <div className="column">
                      <h5>Insurance Accepted</h5>
                      <ul>
                        {this.props.profile.insurance.map((
                          age,
                          key // maps through ages served
                        ) => (
                          <li key={key}>{age}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="column">
                      <h5>Session Formats</h5>
                      <ul>
                        {this.props.profile.session_format.map(
                          // maps through the session_formats available
                          (session_format, key) => (
                            <li key={key}>{session_format}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
                {!this.props.profile.student && (
                  <div className="row border-top">
                    <div className="column">
                      <h5>Telehealth</h5>
                      <ul className="flex-between row-wrap">
                        <li>{this.telehealth()}</li>
                        {/* Checkes whether the Telehealth is true or not and then returns statement saying Telehealth is offered or not depending on profile.telehealth */}
                      </ul>
                    </div>
                    <div className="column">
                      <h5>Fees</h5>
                      <h6>${this.props.profile.fees}</h6>
                    </div>
                  </div>
                )}
                <div className="row border-top">
                  <div className="column">
                    <h5>Supervision Status</h5>
                    <p>{this.props.profile.supervision_status}</p>
                  </div>
                  <div className="column">
                    <h5>Languages Spoken</h5>
                    <ul>
                      {this.props.profile.languages.map((
                        language,
                        key // maps through the languages spoken
                      ) => (
                        <>
                          <li key={key}>{language}</li>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="columnSide">
                <h3 className="island">
                  {this.props.profile.city}, {this.props.profile.island}
                </h3>
                <div className="contact">
                  <ul>
                    {this.props.profile.phone[0]}
                    {/* Since there will only be one phone and no non business numbers I think we can simply just call the first one */}
                    <div>{this.props.profile.email[0]}</div>
                    {/* Same with email */}
                    <p>{this.website(this.props.profile.website)}</p>
                    {/* chceks to see if website is there adds if there is */}
                    <li>{this.props.profile.address}</li>
                    <li>{this.props.profile.city}, {this.props.profile.zip_code}</li>
                  </ul>
                </div>

                <div style={mapStyles}>
                  <Map // creates google map with the center being where google geocoding api locates lat and long from the address
                    style={mapStyles}
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    center={{
                      lat: this.state.lat,
                      lng: this.state.lng,
                    }}
                    zoom={11}
                  >
                    <Marker
                      position={{ lat: this.state.lat, lng: this.state.lng }}
                    />
                    <InfoWindow>
                      <>Information</>
                    </InfoWindow>
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <h1>Loading...</h1>;// wait for conditional rendering to load
    }
  }
}
const mapStateToProps = (state) => ({// props
  profile: state.profile,
  user: state.user
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({// google apikey and wrapper for the component
    apiKey: API_KEY,
  })(ProfileView)
);
