import React from 'react';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {

  render() {
    return (
      <div id="main-page">
        <h1 id="main-header">WABBIT</h1>
        <Link to="/signup">HOP TO IT</Link>
        {/* <footer>
          Copyright &copy; 2019 Chirper
        </footer> */}
      </div>
    );
  }
}

export default MainPage;