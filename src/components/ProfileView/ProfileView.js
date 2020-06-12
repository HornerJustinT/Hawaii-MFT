import React, { Component } from "react";
import "./ProfileView.css";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
// import EmailModal from '../EmailModal/EmailModal'
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper
} from "google-maps-react";

//CSS import
import "../App/App.css";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const mapStyles = {
  position: "absolute",

  width: "250px",
  height: "250px",
};

class ProfileView extends Component {
  state = {
    lat: 0,
    lng: 0,
  };
  
  componentDidMount() {// fetchs profile info
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: this.props.match.params,
    });
  }

  telehealth=(doesTelehealth)=>{
    if(doesTelehealth){
      return <p>Yes I do provide telehealth</p>
    }
    else{
      return <p>No, I do not provide telehealth at this time</p>
    }
  }
  credentials=(credentials)=>{// checks if credentials are there function
    if(credentials){
      return<ul>{this.props.profile[0].credentials.map((credentials,key) =>
        <p key={key}>{credentials}</p>)}
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
      const url_address = encodeURI(this.props.profile.address[0]).replace(
        /%20/g,
        "+"
      );
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${url_address}&key=${API_KEY}`
      )
        .then((data) => data.json())
        .then((data) =>
          this.setState({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          })
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
  home = () => {
    this.props.history.push('/home')
  }

  render() {
    if (this.props.profile.first_name) {// waits for the dispatch to have finished
      this.setMAP();// sets the map
      return (
        <>
          <div className="profileView-container">
            <div className="bio-container">
              <Button onClick={this.home} className="backSearch">
                Back to search Results
              </Button>
              <div className="bio-title">
                <div className="leftside">
                  <h2>
                    {this.props.profile.first_name}{" "}
                    {this.props.profile.last_name}
                  </h2>
                  {this.credentials()}
                </div>
                <div className="bio">
                  <p>{this.props.profile.statement}</p>
                </div>
              </div>
              <div className="border-top">
                <h4>Treatments & Approaches</h4>
                <div className="ts">
                  <ul>
                    {this.props.profile.treatment_preferences.map(
                      (treatment_preferences, key) => (
                        <p key={key}>{treatment_preferences}</p>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="border-top">
                <h4>Specialities</h4>
                <ul>
                  {this.props.profile.specialty.map((specialty, key) => (// maps through specialities of therapist
                    <p key={key}>{specialty}</p>
                  ))}
                </ul>
              </div>
              <div className="border-top">
                <h4>Insurance Taken</h4>
                <div className="box1 flex-between row-wrap">
                  <ul>
                    {this.props.profile.insurance.map((age, key) => (// maps through ages served
                      <p key={key}>{age}</p>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-top">
                <h4>Supervision Status</h4>
                <div className="box1">
                  <ul className="flex-between row-wrap">
                    <p>{this.props.profile.supervision_status}</p>
                  </ul>
                </div>
              </div>
              <div className="telehealth border-top">
                <h4>Telehealth</h4>
                <ul className="flex-between row-wrap">
                  <p>{this.telehealth()}</p>
                  {/* Checkes whether the Telehealth is true or not and then returns statement saying Telehealth is offered or not depending on profile.telehealth */}
                </ul>
              </div>
              <div className="border-top">
                <h4>Client Focus</h4>
              </div>
              <div className="clientFocus row-wrap">
                <div className="clientAge">
                  <h5>Age</h5>
                  <ul>
                    {this.props.profile.ages_served.map((age, key) => (// maps through the ages served by the therapist
                      <p key={key}>{age}</p>
                    ))}
                  </ul>
                </div>
                <div className="clientDemographics">
                  <h5>Demographics</h5>
                  <ul>
                    {this.props.profile.client_focus.map((age, key) => (// maps through the client focuses of the therapist
                      <p key={key}>{age}</p>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-top">
                <h4>Languages Spoken</h4> 
                <ul>
                  {this.props.profile.languages.map((language, key) => (// maps through the languages spoken
                    <p key={key}>{language}</p>
                  ))}
                </ul>
              </div>
              <div className="border-top">
                <h4>Session Formats</h4>
                <ul>
                  {this.props.profile.session_format.map(// maps through the session_formats available
                    (session_format, key) => (
                      <p key={key}>{session_format}</p>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="rightside">
              <div>
                <h3>
                  {this.props.profile.city}, {this.props.profile.island}
                </h3>
              </div>

              {/* <div className="emailModal">
                <EmailModal props = {this.props.profile.id}></EmailModal>
              </div> */}
              <div className="contact">
                <h4>Contact</h4>
                <ul>
                  {this.props.profile.phone[0]}
                  {/* Since there will only be one phone and no non business numbers I think we can simply just call the first one */}
                  <div>{this.props.profile.email[0]}</div>
                  {/* Same with email */}
                  <p>{this.website(this.props.profile.website)}</p>
                  {/* chceks to see if website is there adds if there is */}
                  <p>
                    {this.props.profile.address} {this.props.profile.zip_code}
                  </p>
                </ul>


                <div style={mapStyles}>
                  <Map  // creates google map with the center being where google geocoding api locates lat and long from the address
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
                    <InfoWindow></InfoWindow>
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
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({// google apikey and wrapper for the component
    apiKey: API_KEY,
  })(ProfileView)
);
