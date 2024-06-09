import { useEffect, useState } from "react"

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function Square({ value, handleClick}) {
    return <button className="square" onClick={handleClick}>{value}</button>
}



export default function App() {
    const [values, setValues] = useState([
        null,
        null,
        null,

        null,
        null,
        null,

        null,
        null,
        null,
    ])
    const [isXTurn, setIsXTurn] = useState(true)
    const [winner, setWinner] = useState()

    useEffect(() => {
        const win = calculateWinner(values)
        if (win == null) return

        setWinner(win)
    }, [values])

    function handleClick(index) {
        if (values[index] || winner) return
        const newValues = values.slice()
        if(isXTurn){
            newValues[index] = 'X'
            setIsXTurn(false)
        } else {
            newValues[index]= 'O'
            setIsXTurn(true)
        }
        setValues(newValues)
    }

    function handleRestart() {
        setValues(Array(9).fill(null))
        setWinner(null)
        setIsXTurn(true)
    }

    return ( 
    <div>
        <h1 className="status">{winner ? winner + ' is Win!' : 'Next Player: ' + (isXTurn ? 'X' : 'O')} </h1>
        <div className="board-row">
            <Square value={values[0]} handleClick={() => {handleClick(0)}} />
            <Square value={values[1]} handleClick={() => {handleClick(1)}}/>
            <Square value={values[2]} handleClick={() => {handleClick(2)}}/>
        </div>
        <div className="board-row">
            <Square value={values[3]} handleClick={() => {handleClick(3)}}/>
            <Square value={values[4]} handleClick={() => {handleClick(4)}}/>
            <Square value={values[5]} handleClick={() => {handleClick(5)}}/>
        </div>
        <div className="board-row">
            <Square value={values[6]} handleClick={() => {handleClick(6)}}/>
            <Square value={values[7]} handleClick={() => {handleClick(7)}}/>
            <Square value={values[8]} handleClick={() => {handleClick(8)}}/>
        </div>
        <button onClick= {() => handleRestart()}>Restart</button>
    </div>
    )
}

