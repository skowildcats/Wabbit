import React from 'react';
// import jQuery from 'jquery';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.userId).then(() => this.setState({loading: false}))
  }

  componentDidUpdate() {
    if (window.$(".sortable").length > 0) {
      window.$(".sortable").sortable()
    } 
  }

  render() {
    const {tasks} = this.props

    if (this.state.loading) {
      return null
    } else {
      return (
        <div id="home-page">
          <ul id="tasks" className="sortable">
          {tasks.map(task => {
            return <div  className="ui-state-default" key={task._id}>
              {task.title}
            </div>
          })}
          </ul>
          
        </div>
      );
    }
  }
}

export default HomePage;