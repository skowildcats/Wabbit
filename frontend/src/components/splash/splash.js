import React from 'react';
import { Link } from 'react-router-dom';

export default class Splash extends React.Component {

  render() {
    return (
      <div id="splash">
        <img src={process.env.PUBLIC_URL + "/logo.png"} />
        <Link to="/signup">HOP TO IT</Link>
        {/* <footer>
          Copyright &copy; 2019 Chirper
        </footer> */}
      </div>
    );
  }
};