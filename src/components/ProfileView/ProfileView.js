import React, { Component } from 'react';
import './ProfileView.css';
import avatar from '../ProfileView/avatar.png';
import googleMap from '../ProfileView/map-placeholder.jpg';


class ProfileView extends Component{
    render (){
        return (
            <>
            <div className='profileView-container'>
                <div className='leftside'>
                <div className='bio-container'>
                <button className='backSearch'>Back to search Results</button>
                <div className='bio-title'>
                    <h1>Jain Rain</h1>
                    <h3>Counselor, Ma, ATR, LPCC, LAMFT</h3>
                </div>
                <div className='bio'><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of
                     Lorem Ipsum.</p>
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
                <div className='treatment'>
                   <h2>treatments & Approaches</h2>
                  <div className='ts'>
                  <ul>
                <p>Attachment-based</p>
                <p>Dialectical</p>
                <p>Family/Maritial</p>
                <p>Play Theraphy</p>
                   </ul>
                  </div>
                  <div className='approaches'>
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
                <div className='insurance'>
                    <h2>Insurance Taken</h2>
                    <div className='box1'>
                        <p>Hawaii Medical</p>
                        <p>Multiplan</p>
                        <p>TRICARE</p>
                        <p>University Health Alliance</p>
                        </div>
                        <div className='box2'>
                        <p>Services Association</p>
                        <p>Optum</p>
                        <p>UnitedHealthCare</p>
                        </div>
                </div>
                <div>
                    <h2>Supervision Status</h2>
                    <p>AAMFT-approved</p>
                </div>
                <div className='telehealth'>
                    <h2>Telehealth</h2>
                    <p>Yes, I am providing telehealth</p>
                </div>
                <div className='clientFocus'>
                    <h2>Client Focus</h2>
                    <div className='clientAge'>
                        <h3>Age</h3>
                        <p>Any</p>
                    </div>
                    <div className='clientDemographics'>
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
                <div className='rightside'>
                  <div>
                   <h1>Kailua, O'ahu</h1>
                   <button>Send Referral Email</button>
                   </div>
                   <div>
                   <img width ='200' height = '200' src = {avatar}/>
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
                       <div>
                           <img width ='200' height = '200' src={googleMap}/>
                       </div>
                   </div>
                </div>

            </div>
            </>
        )
    }
}

export default ProfileView;