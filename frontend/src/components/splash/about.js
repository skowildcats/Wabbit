import React from 'react';

export default class About extends React.Component {

  componentDidMount() {
    const splash = document.getElementById("splash")
    // splash.style.background = `#ebf0ec url(${process.env.PUBLIC_URL + "/background.png"})`;
    // splash.style.backgroundSize = "300px";
  }

  render() {
    return (
      <>
        <p id="our-team">OUR TEAM</p>
        <div id="about" className="splash-box">
          <div className="team-member">
            <img className="team-pic" src={process.env.PUBLIC_URL + "/kyle.jpg"} />
            <p className="name">KYLE</p>
            <a href="https://github.com/webbdevv/" className="contact-link">
              <img id="github" src={process.env.PUBLIC_URL + "/github.png"} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/kyle-xu/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/linkedin.png"} alt="linkedin" />
            </a>
            <a href="https://angel.co/u/kyle-xu-1/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/angellist.png"} alt="linkedin" />
            </a>
            <p className="team-role">TEAM LEAD</p>
          </div>
          <div className="team-member">
            <img className="team-pic" src={process.env.PUBLIC_URL + "/joseph.png"} />
            <p className="name">JOSEPH</p>
            <a href="https://github.com/josephwyang/" className="contact-link">
              <img id="github" src={process.env.PUBLIC_URL + "/github.png"} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/josephwyang/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/linkedin.png"} alt="linkedin" />
            </a>
            <a href="https://angel.co/u/josephwyang/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/angellist.png"} alt="linkedin" />
            </a>
            <p className="team-role">FRONTEND LEAD</p>
          </div>
          <div className="team-member">
            <img className="team-pic" src={process.env.PUBLIC_URL + "/jon.png"} />
            <p className="name">JON</p>
            <a href="https://github.com/skowildcats/" className="contact-link">
              <img id="github" src={process.env.PUBLIC_URL + "/github.png"} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/jon-chen67/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/linkedin.png"} alt="linkedin" />
            </a>
            <a href="https://angel.co/u/jonathan-chen-30/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/angellist.png"} alt="linkedin" />
            </a>
            <p className="team-role">FLEX DEVELOPER</p>
          </div>
          <div className="team-member">
            <img className="team-pic" src={process.env.PUBLIC_URL + "/isaac.png"} />
            <p className="name">ISAAC</p>
            <a href="https://github.com/theonewei/" className="contact-link">
              <img id="github" src={process.env.PUBLIC_URL + "/github.png"} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/isaac-wei-9945a2105/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/linkedin.png"} alt="linkedin" />
            </a>
            <a href="https://angel.co/u/isaac-wei/" className="contact-link">
              <img id="linkedin" src={process.env.PUBLIC_URL + "/angellist.png"} alt="linkedin" />
            </a>
            <p className="team-role">BACKEND LEAD</p>
          </div>
        </div>
      </>
    );
  }
};