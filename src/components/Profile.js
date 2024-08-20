import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <img
        src={`${process.env.PUBLIC_URL}/images/solomon-profile-photo.jpg`}
        alt="Solomon Taiwo"
        className="profile-photo"
      />
      <div className="profile-description">
        <h1>Solomon Taiwo</h1>
        <p>
          I'm Solomon Taiwo, a passionate software engineer with a Bachelor's
          degree in Computer Science from the{" "}
          <a
            href="https://corsi.unife.it/informatica"
            target="_blank"
            rel="noreferrer"
          >
            University of Ferrara
          </a>.{" "}
          <br /> <br />
          I'm currently working at{" "}
          <a href="https://www.teleconsys.it/" target="_blank" rel="noreferrer">
            Teleconsys
          </a>{" "}
          and pursuing a Master's degree in Computer Engineering at the{" "}
          <a
            href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering"
            target="_blank"
            rel="noreferrer"
          >
            Polytechnic University of Turin
          </a>
          , specializing in Artificial Intelligence and Data Analysis.
        </p>
      </div>
    </div>
  );
};

export default Profile;
