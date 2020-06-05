import React, { Component } from "react";
import "./ProfileView.css";
import avatar from "../ProfileView/avatar.png";
import googleMap from "../ProfileView/map-placeholder.jpg";
import { connect } from "react-redux";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  google,
} from "google-maps-react";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const mapStyles = {
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
    console.log(this.props)
  }
  telehealth=(doesTelehealth)=>{
    if(doesTelehealth){
      return <p>Yes I do provide telehealth</p>
    }
    else{
      return <p>No, I do not provide telehealth at this time</p>
    }
  }
  credentials=(credentials)=>{
    if(credentials){
      return<ul>{this.props.profile[0].credentials.map((credentials,key) =>
        <p key={key}>{credentials}</p>)}
        </ul>
    }
  }
  website=(website)=>{
    if(website){
      return <p>{this.props.profile.website}</p>
    }
  }
  setMAP = () => { // function that sets the map latitudes only when it was unchanged to stop infinete loop. I do not know how to set up async for when the dispatch is done.
    if (this.state.lat == 0 && this.state.lng ==0 ) {
      console.log(this.props.profile.address[0]);
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
    console.log(this.props);
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
    console.log(this.props)
    if (this.props.profile.first_name) {// waits for the dispatch to have finished
      this.setMAP();// sets the map
      return (
        <>
          <div className="profileView-container">
            <div className="leftside">
              <div className="bio-container">
                <button onClick = {this.home}className="backSearch">Back to search Results</button>
                <div className="bio-title">
                  <h1>
                    {this.props.profile.first_name}{" "}
                    {this.props.profile.last_name}
                  </h1>
                  {this.credentials()}
                </div>
                <div className="bio">
                  <p>{this.props.profile.hiamft_member_account_info}
                  </p>
                  <p>{this.props.profile.statement}</p>
                </div>
              </div>
              <div>
                <div>
                  <h2>Educations</h2>
                </div>
                <div>
                  <p>Argosy University</p>
                  <p>Year Graduated</p>
                  <p>License and state</p>
                </div>
              </div>
              <div className="treatment">
                <h2>Treatments & Approaches</h2>
                <div className="ts">
                <ul>{this.props.profile.treatment_preferences.map((treatment_preferences,key) =>
                <p key={key}>{treatment_preferences}</p>)}
                </ul>
                </div>
                <div className="approaches">
                  {/* do we have anything for approaches? */}
                </div>
              </div>
              <div>
                <h2>Specialities</h2>
                <ul>{this.props.profile.specialty.map((specialty,key) =>
                <p key={key}>{specialty}</p>)}
                </ul>
              </div>
              <div className="insurance">
                <h2>Insurance Taken</h2>
                <div className="box1">
                <ul>{this.props.profile.ages_served.map((age,key) =>
                <p key={key}>{age}</p>)}
                </ul>
                </div>
              </div>
              <div>
                <h2>Supervision Status</h2>
                <p>AAMFT-approved</p>
              </div>
              <div className="telehealth">
                <h2>Telehealth</h2>
                {this.telehealth()}
              </div>
              <div className="clientFocus">
                <h2>Client Focus</h2>
                <div className="clientAge">
                  <h3>Age</h3>
                  <ul>{this.props.profile.ages_served.map((age,key) =>
                <p key={key}>{age}</p>)}
                </ul>
                </div>
                <div className="clientDemographics">
                  <h3>Demographics</h3>
                  <ul>{this.props.profile.client_focus.map((age,key) =>
                <p key={key}>{age}</p>)}
                </ul>
                </div>
              </div>
              <div>
                <h2>Languages Spoken</h2>
                <ul>{this.props.profile.languages.map((language,key) =>
                <p key={key}>{language}</p>)}
                </ul>
              </div>
              <div>
                <h2>Session Formats</h2>
                <ul>{this.props.profile.session_format.map((session_format,key) =>
                <p key={key}>{session_format}</p>)}
                </ul>
              </div>
            </div>
            <div className="rightside">
              <div>
                <h1>{this.props.profile.city}, {this.props.profile.island}</h1>
                <button>Send Referral Email</button>
              </div>
              <div>
                <img width="200" height="200" src={avatar} />
              </div>
              <div>
                <h2>Contact</h2>
                <ul>
                  <p>{this.props.profile.phone[0]}</p>
                  {/* Since there will only be one phone and no non business numbersI think we can simply just call the first one */}
                  <p>{this.props.profile.email[0]}</p>
                  {/* Same with email */}
                  {this.website(this.props.profile.website)}
                  {/* chceks to see if website is there adds if there is */}
                  <p>{this.props.profile.address}</p>
                  <p>{this.props.profile.city}, Hawaii</p>
                </ul>
                <div className="map">
                  <Map
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
                      title={"The marker`s title will appear as a tooltip."}
                      name={"SOMA"}
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
      return <h1>Hi</h1>;
    }
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: API_KEY,
  })(ProfileView)
);

//   render(){
//     console.log(this.state)
//     return(
// <Map google={this.props.google}
//           onClick={this.onMapClicked}>
//   <Marker
//     title={'The marker`s title will appear as a tooltip.'}
//     name={'SOMA'}
//     position={{lat: this.state.lat, lng: this.state.lng }} />
//         <InfoWindow>
//         </InfoWindow>
//       </Map>
//     )
//   }
// }
