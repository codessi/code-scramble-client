import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexCodeQuizs } from '../../api/codeQuiz'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
import CardColumns from 'react-bootstrap/CardColumns'

import './CodeQuizForms.scss'

class IndexCodeQuizs extends Component {
  constructor () {
    super()
    this.state = {
      codeQuizs: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    const { msgAlert, user } = this.props
    console.log(this.state)
    indexCodeQuizs(user)

      .then(res => {
        console.log(res)
        this.setState({ codeQuizs: res.data.codeQuizs })
      })

      .catch(error => {
        msgAlert({
          heading: 'Index CodeQuizs Failed with error: ' + error.message,
          message: messages.indexCodeQuizsFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { user } = this.props
    let codeQuizJsx
    if (!this.state.codeQuizs) {
      codeQuizJsx = 'Loading...'
    } else if (this.state.codeQuizs.length === 0) {
      codeQuizJsx = 'No quizs to display :('
    } else if (user) {
      codeQuizJsx = this.state.codeQuizs.map(codeQuiz => (

        <Card key={codeQuiz._id} className="Card">
          <Card.Body>
            <Card.Title>{codeQuiz.title}</Card.Title>
            <Card.Text className= "p_wrap">
              {codeQuiz.text}
            </Card.Text>
            <Button className="Button" variant="outline-info" href={'#take-codeQuiz/' + codeQuiz._id}>Take Quiz</Button>
            <Button className="Button" variant="outline-info" href={'#show-codeQuiz/' + codeQuiz._id}>More</Button>
          </Card.Body>
          <Card.Footer>Updated on {codeQuiz.createdAt.slice(0, -14)}</Card.Footer>
        </Card>
      ))
    }

    return (
      <div>
        <h1 className="display-2 text-dark">Choose Code</h1>
        <CardColumns>
          {codeQuizJsx}
        </CardColumns>

      </div>
    )
  }
}

export default withRouter(IndexCodeQuizs)
