import React, { useState, useEffect } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import CardT from './CardT'
const update = require('immutability-helper')

function Component1 (props) {
  const [text, setText] = useState(null)

  const moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }

  useEffect(() => {
    const textArray = props.text.split('\n')
    const cards = []
    for (let i = 1; i < textArray.length; i++) {
      const card = { id: i, text: textArray[i] }
      cards.push(JSON.stringify(card))
    }
    // const newObj = Object.assign({ line: null }, [textArray])
    setText(cards)
    // {}
    console.log('cards is ' + cards)
    console.log('text is ' + text)
  }, [])

  return (
    <div>
      hello
      {console.log('text now is' + typeof text)}
      {text && text.map((card, index) =>
        (<CardT
          key={card.id}
          index={index}
          id={card.id}
          text={card}
          moveCard={moveCard}
        />))}
      {/* {props.text} */}
    </div>
  )
}

export default DragDropContext(HTML5Backend)(Component1)

// export default Component1
