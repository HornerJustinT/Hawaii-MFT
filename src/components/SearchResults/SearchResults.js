// React imports
import React, { Component } from 'react';

// React Boostrap
import Card from "react-bootstrap/Card";

// Styling
import './SearchResults.css'
import "../App/App.css";


class SearchResults extends Component {

  truncateString = (str, num) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

    render() { 
        return (
          <>
            <div >
              <div className="tagline ">
                <h2>We Know</h2>
                <h1>Family Matters</h1>
              </div>
            </div>
            

            <div className="results-bin">
              {this.props.therapists[0] && (
                <h4 className="results-number center">
                  Hawaiian Islands Association for Marriage & Family Therapist Directory
                </h4>
              )}

              {this.props.therapists.map((therapist) => (
                // I made it a div to encapsulate the Card instead of just
                // a Card so if needed we could add more to each result.
                // One thing we will add in the future is the small map
                // Showing quickly where each therapist is located.
                // as of now however that doesnt exist so nothing shows in its place.

                // search-result is already a flexbox so adding something will auto-format
                <div className="flex-evenly">
                  <Card
                    style={{ width: "80%", margin: "10px" }}
                    className="card"
                  >
                    <Card.Body>
                      {/* 
                        The name and location of the therapist
                        This information is super important so its placed
                        at the very top of the card.
                    */}
                      <Card.Title>
                        {/* 
                            flex-between is a class that simply does inables flexbox
                            with space between.effectively this just alligns content
                            to the sides of the Card but it could be used later for 
                            other items if we decide to show more.
                         */}
                        <div className="flex-between mobile-padding">
                          {/* 
                            Due to how flexbox is each set of information is in
                            its own <div /> tag. I gave these all unique classes
                            in case we decide to give any of them a special
                            look, font or any other css changes.
                        */}
                          <div className="name">
                            {therapist.first_name} {therapist.last_name}
                          </div>
                          {!therapist.student ? 
                          <div className="island">
                            {therapist.city}, {therapist.island[0]}
                          </div>
                          :
                          <div className="island">
                          { therapist.island[0] }
                          </div>
                          }
                        </div>
                      </Card.Title>
                      {/*
                        The subtitle section is less important
                        information that we still want very visible.
                        This information is all of the qualifications
                        of the therapist as well as the phone number.

                        The qualifications need to be visible so the 
                        person searching can easily see they are getting
                        exactly what they are looking for and need.

                        Phone number is also needed right away because
                        its generally the easiest way to contact someone.
                        
                        The text was colored gray in the bootstrap example
                        so I kept it here. I considered changing it but I feel
                        its better to keep it gray. It's still visible but it
                        makes it distinct as well as acting like a divider between
                        the header and the body information.
                    */}
                      <Card.Subtitle className="mb-2 text-muted">
                        <div className="flex-between row-wrap">
                          {!therapist.student ? 
                            <div className="titles">
                              {/* 
                              The amount of titles a therapist could have can
                              vary wildly. Using this join method I can display
                              them all nicely and without much effort.
                            */}
                              {therapist.credentials}
                            </div>
                          :
                          <div className="titles">
                            Student
                          </div>
                          }
                          {!therapist.student ? 
                          <div className="number">{therapist.phone[0]}</div>
                          :
                            <div className="contact-info">
                              <>
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={`${therapist.website}`}
                                >
                                  {therapist.website}
                                </a>
                              </>
                            </div>
                                
                          }
                        </div>
                      </Card.Subtitle>
                      <Card.Text>
                        <div className="flex-between row-wrap-reverse">
                          <div className="description">
                            {this.truncateString(therapist.statement, 250)}
                          </div>
                          {/* Contact is aligned to the right for visual appeal */}
                          
                          {!therapist.student ? 
                          
                          <div className="contact-info">
                            {therapist.email[0]} <br />
                            {/*
                            The link here links to the page it mentions.
                            It does so by turning itself into an https link
                            and then opening that link in a new tab when clicked.

                            I wanted it to open in a new tab so it doesn't destroy
                            the users search results.
                          */}
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://${therapist.website}`}
                            >
                              {therapist.website}
                            </a>
                          </div>
                        :
                        ''
                        }
                      </div>
                      </Card.Text>
                      <Card.Link href={`#/profile/${therapist.id}`}>
                        View Profile
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </>
        );
    }
}
 
export default SearchResults;