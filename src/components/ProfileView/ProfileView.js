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
const API_KEY = process.env.GOOGLE_MAPS_KEY;
const mapStyles = {
  width: "250px",
  height: "250px",
};
class ProfileView extends Component {
  state = {
    lat: 0,
    lng: 0,
  };
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: this.props.match.params,
    });
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=301+S+4th+Ave,+Minneapolis+,+MN&key=AIzaSyD9iV0fu1kjKcms_zxK924sdGcgDN18X5s"
    )
      .then((data) => data.json())
      // .then(data=> console.log(data.results[0].geometry.location.lat))
      // .then(data=> console.log(data))
      .then((data) =>
        this.setState({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        })
      );
  }
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

  render() {
    console.log(this.props.profile);
    console.log(this.state);
    return (
      <>
        <div className="profileView-container">
          <div className="leftside">
            <div className="bio-container">
              <button className="backSearch">Back to search Results</button>
              <div className="bio-title">
                <h1>
                  {this.props.profile.first_name} {this.props.profile.last_name}
                </h1>
                <h3>Counselor, Ma, ATR, LPCC, LAMFT</h3>
              </div>
              <div className="bio">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
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
              <h2>treatments & Approaches</h2>
              <div className="ts">
                <ul>
                  <p>Attachment-based</p>
                  <p>Dialectical</p>
                  <p>Family/Maritial</p>
                  <p>Play Theraphy</p>
                </ul>
              </div>
              <div className="approaches">
                <ul>
                  <p>Cogniotive Behaviorial</p>
                  <p>Emotionally Focused</p>
                  <p>Narrative</p>
                  <p>Relational</p>
                </ul>
              </div>
            </div>
            <div>
              <h2>Specialities</h2>
              <ul>
                <p>Anxiety</p>
                <p>Depression</p>
                <p>Trauma & PTSD</p>
                <p>Addiction</p>
              </ul>
            </div>
            <div className="insurance">
              <h2>Insurance Taken</h2>
              <div className="box1">
                <p>Hawaii Medical</p>
                <p>Multiplan</p>
                <p>TRICARE</p>
                <p>University Health Alliance</p>
              </div>
              <div className="box2">
                <p>Services Association</p>
                <p>Optum</p>
                <p>UnitedHealthCare</p>
              </div>
            </div>
            <div>
              <h2>Supervision Status</h2>
              <p>AAMFT-approved</p>
            </div>
            <div className="telehealth">
              <h2>Telehealth</h2>
              <p>Yes, I am providing telehealth</p>
            </div>
            <div className="clientFocus">
              <h2>Client Focus</h2>
              <div className="clientAge">
                <h3>Age</h3>
                <p>Any</p>
              </div>
              <div className="clientDemographics">
                <h3>Demographics</h3>
                <ul>
                  <p>Any</p>
                  <p>Gay/Lesbian/Bisexual/Transgender</p>
                  <p>Women/Feminist</p>
                </ul>
              </div>
            </div>
            <div>
              <h2>Languages Spoken</h2>
              <ul>
                <p>English</p>
                <p>Tagalog</p>
              </ul>
            </div>
            <div>
              <h2>Session Formats</h2>
              <ul>
                <p>Individuals</p>
                <p>Coouples</p>
                <p>Families</p>
              </ul>
            </div>
          </div>
          <div className="rightside">
            <div>
              <h1>Kailua, O'ahu</h1>
              <button>Send Referral Email</button>
            </div>
            <div>
              <img width="200" height="200" src={avatar} />
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <p>808-123-4567</p>
                <p>jane@familytheraphy.com</p>
                <p>familytheraphy.com</p>
                <p>123 Dreamhouse Lane</p>
                <p>Kailua, Hawaii</p>
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
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyD9iV0fu1kjKcms_zxK924sdGcgDN18X5s",
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
