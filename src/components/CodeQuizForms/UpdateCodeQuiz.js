import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showCodeQuiz, updateCodeQuiz } from '../../api/codeQuiz'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CodeQuizUpdate = (props) => {
  const [codeQuiz, setCodeQuiz] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    // show request
    showCodeQuiz(user, match.params.codeQuizId)
      .then(res => setCodeQuiz(res.data.codeQuiz))
      // .then(() => msgAlert({
      //   heading: 'CodeQuiz Show Success',
      //   message: 'Check it out',
      //   variant: 'success'
      // }))
      .catch(err => msgAlert({
        heading: 'CodeQuiz Show failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setCodeQuiz(oldCodeQuiz => {
      const updatedCodeQuiz = { ...oldCodeQuiz, ...updatedField }
      return updatedCodeQuiz
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateCodeQuiz(user, codeQuiz, match.params.codeQuizId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .then(() => history.push('/index-codeQuizs'))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error Code: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/codeQuizs/${match.params.codeQuizId}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update CodeQuiz Information</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="codeQuiz">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="CodeQuiz"
            value={codeQuiz.title}
            onChange={handleChange}
            name="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            placeholder="Enter codeQuiz's description"
            value={codeQuiz.text}
            onChange={handleChange}
            name="text"
          />
        </Form.Group>

        <Button variant='primary' type="submit">Update CodeQuiz</Button>
      </Form>
    </React.Fragment>
  )
}

export default CodeQuizUpdate
