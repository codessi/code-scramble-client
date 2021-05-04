import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signIn } from '../../api/auth'
// import messages from '../AutoDismissAlert/messages'

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      email: 'guest@reactive',
      password: 'a'
    }
  }

  onSignIn = (e) => {
    console.log(this.props)
    const { setUser, history } = this.props
    e.preventDefault()
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert('success'))
      .then(() => history.push('/index-codeQuizs'))
      .catch(() => alert('sign in failed'))
      // .catch(error => {
      //   this.setState({ email: '', password: '' })
      //   msgAlert({
      //     heading: 'Sign In Failed with error: ' + error.message,
      //     message: messages.signInFailure,
      //     variant: 'danger'
      //   })
      // })
  }

  render () {
    return (
      <Form onSubmit={this.onSignIn}>
        <Button
          type="submit"
          variant="link"
          className="pl-0"
        >
          Sign In As Guest
        </Button>
      </Form>
    )
  }
}
export default withRouter(SignIn)
