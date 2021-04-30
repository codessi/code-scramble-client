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
    // get it from prop and set it to state???  noo
    // the other way.  get it from state and send it to prop.
    // ok signin api passing state and get response then set state of paprents. -> signIn
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Welcome!',
        message: messages.signInSuccess,
        variant: 'success'
      }))
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
