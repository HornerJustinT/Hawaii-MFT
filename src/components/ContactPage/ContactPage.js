import React from 'react';

//import CSS file
import "./ContactPage.css";
import "../App/App.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


const AboutPage = () => (
  <div className="body">
    <div>
      <h1>Get in touch!</h1>
      <h2>Contact HIAMFT Today</h2>
      <h3>
        We generally respond to emails by the next day. We look forward to
        hearing from you.
      </h3>
    </div>

    <div className="body2">
      <div>
        <h6>Address</h6>
        <p>Po Box 698 Honolulu, HI 96709</p>
      </div>
      <div>
        <h6>Let's Have A Talk</h6>
        <p>Call: (808) 291-5321</p>
        <p>Email: hawaiianislandsmfts@gmail.com</p>
      </div>
      <div>
        <h6>Working Hours</h6>
        <p>Mon – Fri: 9:00 AM – 4:00 PM Sat-Sun: Closed</p>
      </div>
    </div>
  </div>
);

export default AboutPage;
