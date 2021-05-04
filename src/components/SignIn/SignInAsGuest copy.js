import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: 'guest@reactive',
      password: 'a'
    }
  }

  onSignIn = event => {
    event.preventDefault()
    // when you click submit
    const { msgAlert, history, setUser } = this.props
    // so 3 things  1 what to do respond information
    // 2 let user know it's worked
    // 3 go to what page.
    // *4 or let them know it failed.
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert('success'))
      // msgAlert({
      //   heading: 'Welcome!',
      //   message: messages.signInSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/index-codeQuizs'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    //
    return (
      <Form onSubmit={this.onSignIn}>
        <Button
          variant="link"
          type="submit"
          className="pl-0"
        >
          Sign In As Guest
        </Button>
      </Form>
    )
  }
}

export default withRouter(SignIn)
