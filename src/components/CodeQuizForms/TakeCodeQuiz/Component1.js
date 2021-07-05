import React, { useState, useEffect } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import CardT from './CardT'
const update = require('immutability-helper')

function Component1 (props) {
  const [text, setText] = useState({ cards: null })

  const moveCard = (dragIndex, hoverIndex) => {
    const { cards } = text
    const dragCard = cards[dragIndex]
    setText(
      update(text, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }
  const shuffle = function (x) {
    const a = x.split('\n')
    const n = a.length

    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = a[i]
      a[i] = a[j]
      a[j] = tmp
    }
    console.log(a)
    return a
  }

  useEffect(() => {
    const textArray = shuffle(props.text)
    // const textArray = props.text
    console.log('props.text is ' + props.text)
    const cards = []
    for (let i = 0; i < textArray.length; i++) {
      const card = { id: i, text: textArray[i] }
      cards.push(card)
    }
    setText({ cards: cards })
  }, [])

  return (
    <div>
      {console.log('text now is' + JSON.stringify(text))}
      {text.cards && text.cards.map((card, index) =>
        (<CardT
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />))}
    </div>
  )
}

export default DragDropContext(HTML5Backend)(Component1)
