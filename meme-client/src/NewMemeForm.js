import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addMeme } from './actions';

class NewMemeForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      topText: '',
      bottomText: '',
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMeme(this.props.user, this.props.id, this.state.topText, this.state.bottomText, this.props.name);
    this.setState({
      topText: '',
      bottomText: ''
    })
    console.log("form",this.props);
    this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="topText">Text for top of photo:&nbsp;</label>
        <input
          name="topText"
          type="text"
          onChange={this.handleChange}
          placeholder="JavaScript"
          value={this.state.content}
        />
        <label htmlFor="bottomText">&nbsp;Text for bottom of photo:&nbsp;</label>
        <input
          name="bottomText"
          type="text"
          onChange={this.handleChange}
          placeholder="is coming"
          value={this.state.content}
        />
        <span className="space">&nbsp;</span>
        <button type="submit">
          <span className="glyphicon glyphicon-plus" ></span>
        </button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    memes: state.memes
  };
}

NewMemeForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, { addMeme })(NewMemeForm));

