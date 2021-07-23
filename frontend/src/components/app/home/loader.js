import React from "react";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #95ab99;
`;

class MyLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <PulseLoader css={override} size={50} color={"#95ab99"} loading={this.state.loading} />
      </div>
    );
  }
}

export default MyLoader