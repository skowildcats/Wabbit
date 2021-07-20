import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.userId).then(() => this.setState({loading: false}))
  }

  render() {
    const {tasks} = this.props

    if (this.state.loading) {
      return null
    } else {
      return (
        <div id="home-page">
          <h1 id="home-header">Task</h1>
          {tasks.map(task => {
            return <div>
              {task.title}
            </div>
          })}
        </div>
      );
    }
  }
}

export default HomePage;