import React from "react";
import project1 from "../images/projects/the-artist-room/full-hd/full-hd-home-the-artist-room.png";
import project2 from "../images/projects/bibliotecaUNIFE/full-hd-BibliotecaUNIFE.png";
import project3 from "../images/projects/kshopgraphics/full-hd-kshopgraphics.png";

function Portfolio() {
  const projects = [
    {
      image: project1,
      title: "The Artist Room",
      description:
        'Fully bootstrapped project, created with the Laravel framework and VueJS. "The Artist Room" allows its users to check availability and book rooms, with a simple and effective interface and an admin page that gives the possibility to add new rooms and manage bookings.',
      link: "https://github.com/solomontaiwo/The-Artist-Room",
    },
    {
      image: project2,
      title: "BibliotecaUNIFE",
      description:
        'Written in HTML and PHP, "BibliotecaUNIFE" is a web-page that offers various queries that retrieve data from a database. Nice and effective playground for MySQL queries.',
      link: "https://github.com/solomontaiwo/BibliotecaUNIFE",
    },
    {
      image: project3,
      title: "K-Shop Graphics",
      description:
        "WordPress-based website that acts as a showcase for a small business owner. Thanks to the WooCommerce plugin, it also offers the possibility to shop and order desired products in a few clicks.",
      link: "https://kshopgraphics.com/",
    },
  ];

  return (
    <div className="portfolio-section">
      <h1 id="portfolio" className="portfolio-title">
        Portfolio
      </h1>
      {projects.map((project, index) => (
        <div className="row project-row" key={index}>
          <div className="col-xs-12 col-md-6">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img
                src={project.image}
                className="project-image img-fluid"
                alt={project.title}
              />
            </a>
          </div>
          <div className="col-xs-12 col-md-6">
            <p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
              <br />
              {project.description}
            </p>
          </div>
        </div>
      ))}
      <div className="col-12 more-projects-col">
        <div className="row">
          <h4 className="more-project-text-col col-xs-12 col-md-6">
            That's not all...
          </h4>
          <div className="col-xs-12 col-md-6">
            <a
              href="https://www.github.com/solomontaiwo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my other projects on Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
