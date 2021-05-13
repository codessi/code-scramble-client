import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import { showCodeQuiz, deleteCodeQuiz } from '../../api/codeQuiz'
import { showCodeQuiz } from './../../../api/codeQuiz'
// import Container from 'react-bootstrap/Container'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Board from './Board'
import CardT from './CardT'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
// import { DndContext } from 'react-dnd'
// import '../../index.scss'
const update = require('immutability-helper')

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

  const moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]
    this.setState(
      update(this.state, {
        cards: {
          // what is $splice
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
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
  // setState??  istead of just a?   when wn suffle and passing codequiz is the state and pass the tex and shuffle it and set state again then .. mmm i feel like there is way to create another compoenent..    ok let's practice with simpler project ... like sortable.  this maybe too big of project? ... mmm  .... well what if map the result of shuffle then thurn them in to
  return (
    <div>
      {codeQuiz ? (
        <Board row={12} id='board-1'>
          <Row>
            <Col sm={9}>
              <Card.Title>Title: {codeQuiz.title}</Card.Title>
              {shuffle(codeQuiz.text).map((card, index) =>
                (<CardT
                  key={card}
                  index={index}
                  id={card}
                  text={card}
                  moveCard={moveCard}
                />))}
              <h5>Your Answer</h5>
              <Card.Text className= "p_wrap" rows={3}contentEditable="true">
              </Card.Text>
              <br/>
              <Solution />
            </Col>
          </Row>
        </Board>
      ) : 'Loading...'}
    </div>
  )
}

// export default withRouter(TakeCodeQuiz)
// export default DragDropContext(HTML5Backend)(TakeCodeQuiz)
export default withRouter(DragDropContext(HTML5Backend)(TakeCodeQuiz))
