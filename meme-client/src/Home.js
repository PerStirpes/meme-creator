import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMemes } from './actions';
import { deleteAJAXCall } from './actions';
import './Home.css';

class Home extends Component {

  componentWillMount() {
    this.props.getMemes();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.memes.length !== this.props.memes.length) {
      this.props.getMemes();
    }
  }

  render() {

    let memes = [];
    let button = null;
    
    if(this.props.memes) { 
      memes = this.props.memes.map((meme, i) => {
        if (meme) {
          if (meme.user_id === this.props.user.user_id) {
            button = <button className="btn btn-danger" onClick={() => this.props.deleteAJAXCall(this.props.user.user_id, meme._id)}>X</button>
          } else {
            button = null;
          }
          return (
            <div key={i} className="top">
              <img
                key={i}
                src={meme.url}
                alt={meme.name}
              />
              <div>
              {button}
              </div>
            </div>
          )
        } else {
          return null;
        }
      })
    }

    return (
      <div>
        {memes}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    memes: state.memes,
    user: state.user
  };
}

export default connect(mapStateToProps, { deleteAJAXCall, getMemes })(Home);
