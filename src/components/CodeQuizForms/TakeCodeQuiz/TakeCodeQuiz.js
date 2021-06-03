import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { showCodeQuiz } from './../../../api/codeQuiz'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import Board from './Board'
// import CardT from './CardT'
import Component1 from './Component1'

// const update = require('immutability-helper')

const TakeCodeQuiz = (props) => {
  const [codeQuiz, setCodeQuiz] = useState(null)

  const { user, msgAlert, match } = props
  // console.log(props)
  useEffect(() => {
    showCodeQuiz(user, match.params.codeQuizId)
      .then(res => {
        setCodeQuiz(res.data.codeQuiz)
        // console.log('res is ' + JSON.stringify(res.data.codeQuiz))
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

  // const moveCard = (dragIndex, hoverIndex) => {
  //   const { cards } = this.state
  //   const dragCard = cards[dragIndex]
  //   this.setState(
  //     update(this.state, {
  //       cards: {
  //         $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
  //       }
  //     })
  //   )
  // }

  const Results = () => (
    <div id="results" className=" p_wrap search-results">
      {codeQuiz.text}
    </div>
  )

  // const shuffle = function (x) {
  //   const a = x.split('\n')
  //   const n = a.length

  //   for (let i = n - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     const tmp = a[i]
  //     a[i] = a[j]
  //     a[j] = tmp
  //   }
  //   return a
  // }

  return (
    <div>
      {codeQuiz ? (
        // <Board row={12} id='board-1'>
        <div>
          <Row>
            <Col sm={9}>
              <Card.Title>Title: {codeQuiz.title}</Card.Title>
              {/* {shuffle(codeQuiz.text).map((card, index) =>
                (<CardT
                  key={card}
                  index={index}
                  id={card}
                  text={card}
                  moveCard={moveCard}
                />))} */}
              < Component1 text = {codeQuiz.text} />
              <h5>Your Answer</h5>
              <Card.Text className= "p_wrap" rows={3}contentEditable="true">
              </Card.Text>
              <br/>
              <Solution />
            </Col>
          </Row>
          {/* </Board> */}
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(TakeCodeQuiz)
