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
          Hi, I'm Solomon Taiwo, a passionate software engineer with a
          Bachelor's degree in Computer Science and currently pursuing a
          Master's degree in Computer Engineering at the{" "}
          <a href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering">
            Polytechnic University of Turin
          </a>
          . I am specializing in Artificial Intelligence and Data Analysis and
          have experience working with a variety of programming languages and
          frameworks.
        </p>
      </div>
    </div>
  );
};

export default Profile;
