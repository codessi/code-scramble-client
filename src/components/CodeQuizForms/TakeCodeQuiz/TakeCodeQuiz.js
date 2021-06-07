import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { showCodeQuiz } from './../../../api/codeQuiz'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Component1 from './Component1'

const TakeCodeQuiz = (props) => {
  const [codeQuiz, setCodeQuiz] = useState(null)

  const { user, msgAlert, match } = props

  useEffect(() => {
    showCodeQuiz(user, match.params.codeQuizId)
      .then(res => {
        setCodeQuiz(res.data.codeQuiz)
      })
      .catch(err => {
        msgAlert({
          heading: 'Show CodeQuiz Failed',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const Solution = () => {
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    return (
      <div>
        <input type="submit" value="Solution" onClick={onClick} />
        { showResults ? <Results /> : null }
      </div>
    )
  }

  const Results = () => (
    <div id="results" className=" p_wrap search-results">
      {codeQuiz.text}
    </div>
  )

  return (
    <div>
      {codeQuiz ? (
        <Board row={12} id='board-1'>
          <Row>
            <Col sm={9}>
              <Card.Title>Title: {codeQuiz.title}</Card.Title>
              < Component1 text = {codeQuiz.text} />
              <br/>
              <Solution />
            </Col>
          </Row>
        </Board>      
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(TakeCodeQuiz)
