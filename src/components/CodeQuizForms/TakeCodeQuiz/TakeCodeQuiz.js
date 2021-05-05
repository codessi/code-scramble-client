import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import { showCodeQuiz, deleteCodeQuiz } from '../../api/codeQuiz'
import { showCodeQuiz } from './../../../api/codeQuiz'
import Container from 'react-bootstrap/Container'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Board from './Board'
import CardT from './CardT'

import '../../../index.scss'

const TakeCodeQuiz = (props) => {
  const [codeQuiz, setCodeQuiz] = useState(null)

  const { user, msgAlert, match } = props
  console.log(props)
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

  const shuffle = function (x) {
    const a = x.split('\n')
    const n = a.length

    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = a[i]
      a[i] = a[j]
      a[j] = tmp
    }
    return a
  }

  return (
    <div>
      {codeQuiz ? (
        <Container>
          {/* <p className= "p_wrap">{codeQuiz.text}</p> */}
          <Card key={codeQuiz._id} className="Card">
            <Row>
              <Col sm={9}>
                <Board id='board-1'>
                  <Card.Title>Title: {codeQuiz.title}</Card.Title>
                  {shuffle(codeQuiz.text).map((el, index) => (<CardT component = 'span' className= "p_wrap codeLine" draggable= 'true' rows={10} key= {index} ><p>{el}</p></CardT>))}
                  <h5>Your Answer</h5>
                  <Card.Text className= "p_wrap" rows={10}contentEditable="true">
                  </Card.Text>
                </Board>
                <br/>
                <Solution />
              </Col>
            </Row>
          </Card>
        </Container>

      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(TakeCodeQuiz)
