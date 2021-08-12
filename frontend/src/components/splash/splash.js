import React from 'react';
import { Link } from 'react-router-dom';

export default class Splash extends React.Component {

  componentDidMount() {
    const splash = document.getElementById("splash")
    // splash.style.background = `#ebf0ec url(${process.env.PUBLIC_URL + "/background.png"})`;
    splash.style.backgroundSize = "300px";
  }

  render() {
    return (
      <div id="splash">
        <div id="logo" className="splash-box" >
          <img src={process.env.PUBLIC_URL + "/logo.png"} />
          <Link to="/signup">HOP TO IT</Link>
        </div>
      </div>
    );
  }
};