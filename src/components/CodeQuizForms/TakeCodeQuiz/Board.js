import React from 'react'
import Card from 'react-bootstrap/Card'

function Board (props) {

  const drop = e => {
    e.preventDefault()
    const cardId = e.dataTransfer.getData('cardId')

    const card = document.getElementById(cardId)

    card.style.display = 'block'

    e.target.appendChild(card)
  }

  const dragOver = e => {
    e.preventDefault()
  }

  console.log(props)
  return (
    <Card.Body
      id={props.id}
      rows = {12}
      className = {props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      { props.children }
    </Card.Body>
  )
}

export default Board
