import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './MemePhoto.css';
import { showNewMemeForm } from './actions';

class MemePhoto extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.showNewMemeForm(this);
  }

  render() {
    
    return (
      <div>
        <button onClick={this.handleClick} style={{
          margin: 20
        }}>
          <img src={this.props.url} alt={this.props.name}/>
        </button>
      </div>
    )
  }
}


export default withRouter(connect(null, { showNewMemeForm })(MemePhoto));
