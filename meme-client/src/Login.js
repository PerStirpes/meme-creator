import React from 'react'
import {connect} from 'react-redux'
import {login} from './actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.login(this.state).then(
      res => this.props.history.push('/home'),
      err => {
        console.log('login', this.state, err)
      }
    )
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {username, password} = this.state

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.onSubmit}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm)
