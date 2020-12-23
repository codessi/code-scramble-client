import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import { showCodeQuiz, deleteCodeQuiz } from '../../api/codeQuiz'
import { showCodeQuiz } from '../../api/codeQuiz'
import Container from 'react-bootstrap/Container'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../../index.scss'

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

  // const handleDelete = () => {
  //   deleteCodeQuiz(user, match.params.codeQuizId)
  //     .then(() => {
  //       msgAlert({
  //         heading: 'CodeQuiz Deleted',
  //         message: 'Back to the list of prodcuts',
  //         variant: 'success'
  //       })
  //     })
  //     .then(() => history.push('/index-codeQuizs'))
  //     .catch(err => {
  //       msgAlert({
  //         heading: 'Deletion Failed',
  //         message: 'error:' + err.message,
  //         variant: 'danger'
  //       })
  //     })
  // }

  return (
    <div>
      {codeQuiz ? (
        <Container>
          <p>{codeQuiz.text}</p>
          <Card key={codeQuiz._id} className="Card">
            <Row>
              <Col sm={6}>
                <Card.Body>
                  <Card.Title>{codeQuiz.title}</Card.Title>
                  <Card.Text className= "p_wrap" contentEditable="true">
                    {codeQuiz.text}
                    {codeQuiz.text.split('↵').reverse().join('↵')}
                    {console.log(codeQuiz.text.split('↵').reverse().join('↵'))}
                  </Card.Text>
                  <p></p>
                  {(user._id === codeQuiz.owner) ? (
                    <div>
                      {/* <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '} */}
                      {/* <Button href={'#codeQuiz-update/' + codeQuiz._id}>Update CodeQuiz</Button>{' '} */}
                    </div>
                  ) : ''}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>

      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(TakeCodeQuiz)
