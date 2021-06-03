import React from 'react'

function ShuffleQuiz (props) {
  // const [shuffleCodeQuiz, setShuffleCodeQuiz] = useState(null)
  const { data } = props

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
      { data.text }
    </div>
  )
}

export default ShuffleQuiz
