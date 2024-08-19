import React from 'react';
import profilePhoto from '../images/solomon-profile-photo.jpg'; 

function Intro() {
  return (
    <div className="row intro-section">
      <h1 id="home" className="intro-title">I'm Solomon Taiwo</h1>
      <div className="row intro-row">
        <div className="col-12 col-md-6">
          <img src={profilePhoto} className="avatar-image img-fluid" alt="Solomon Taiwo" />
        </div>
        <div className="col-12 col-md-6">
          <p>
            Bachelor's Degree in Computer Science at the 
            <a href="https://corsi.unife.it/informatica" target="_blank" rel="noopener noreferrer">University of Ferrara</a>.
            <br /><br />
            Currently pursuing a Master's Degree in Computer Engineering at the
            <a href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering" target="_blank" rel="noopener noreferrer">Polytechnic University of Turin</a>
            and working as a Software Engineer at
            <a href="https://www.teleconsys.it/" target="_blank" rel="noopener noreferrer">Teleconsys</a>.
            <br /><br />
            Technologies: C/C++, Python, Java, JavaScript, Ruby, PHP, SQL, Ruby on Rails, Vue.js, Quasar, Laravel and more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Intro;
