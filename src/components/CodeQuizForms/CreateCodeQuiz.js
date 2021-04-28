import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createCodeQuiz } from '../../api/codeQuiz'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateCodeQuiz extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      text: '',
      id: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateCodeQuiz = event => {
    event.preventDefault()
    // console.log(this.state)
    const { msgAlert, history, user } = this.props
    // console.log(user)
    createCodeQuiz(this.state, user)
      .then(res => {
        this.setState({ id: res.data.codeQuiz._id })
      })
      .then(() => msgAlert({
        heading: 'Product Successfully Created!',
        message: messages.createCodeQuizSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/show-codeQuiz/' + this.state.id))
      .catch(error => {
        this.setState({ title: '', text: '' })
        msgAlert({
          heading: 'Product Creation Failed, error: ' + error.message,
          message: messages.createCodeQuizFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, text } = this.state
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create CodeQuiz</h3>
          <Form onSubmit={this.onCreateCodeQuiz}>
            <Form.Group controlId="title">
              <Form.Label>CodeQuiz Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={title}
                placeholder="Enter quiz's name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>CodeQuiz</Form.Label>
              <Form.Control
                required
                name="text"
                value={text}
                type="textarea"
                as = "textarea"
                placeholder="Enter code here"
                onChange={this.handleChange}
                rows={10}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateCodeQuiz)
