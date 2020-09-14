import React from 'react';

//import CSS file
import "./ContactPage.css";
import "../App/App.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


const AboutPage = () => (
  <div className="contact-background">
  <div className="body-contacy">
    <div className="header">
      <h1>Get in touch!</h1>
      <div className="body2">
          <h3>
            We generally respond to emails by the next day. We look forward to
            hearing from you.
        </h3>
      </div>
    </div>

    <div className="address">
      <div className="body3">
          <h6><b>Address</b></h6>
        <p>Po Box 698 Honolulu, HI 96709</p>
      </div>

      <div className="body3">
        <h6><b>Let's Have A Talk</b></h6>
        <p>Call: (808) 291-5321</p>
        <p>Email: hawaiianislandsmfts@gmail.com</p>
      </div>

      <div className="body3">
        <h6><b>Working Hours</b></h6>
        <p>Mon – Fri: 9:00 AM – 4:00 PM Sat-Sun: Closed</p>
      </div>
    </div>
    </div>
  </div>
);

export default AboutPage;
