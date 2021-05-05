import React from 'react'
import Card from 'react-bootstrap/Card'

function Board (props) {
// const drop
  const drop = e => {
    e.preventDefault()
    // it's event e.data tranfer get dat
    const cardId = e.dataTransfer.getData('cardId')

    const card = document.getElementById(cardId)

    card.style.display = 'block'

    e.target.appendChild(card)
  }
  // const drag over when drag...
  const dragOver = e => {
    e.preventDefault()
  }
  // one dif and props.chidren??? props.id
  console.log(props)
  return (
    <Card.Body
      id={props.id}
      className = {props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      { props.children }
    </Card.Body>
  )
}

export default Board
