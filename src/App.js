import React from "react"
import css from './index.css'
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {
  const [diceApp, setDiceApp] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  
  /**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 */
  
  React.useEffect(() => {
      const allHeld = diceApp.every(die => die.isHeld)
      const firstvalue = diceApp[0].value
      const allsameValue = diceApp.every(die => die.value === firstvalue)
      if (allHeld && allsameValue) {
        setTenzies(true)
      }
  }, [diceApp])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const DiceArry = []
      for (let i=0; i<10; i++) {
        DiceArry.push(generateNewDie())
      }
      return DiceArry
    }

    function rollDice() {
      if(!tenzies) {
        setDiceApp(oldDice => oldDice.map(die => {
        return die.isHeld ?
               die:
               generateNewDie()
        }))
      } else {
        setTenzies(false)
        setDiceApp(allNewDice())
      }
    }

    function holdDice(id) {
        setDiceApp(oldDice => oldDice.map(die => {
            const isHeld = die.id === id ? !die.isHeld : die.isHeld // Toggle isHeld if it is equal to id
            return {...die, isHeld}
        }))
        // if it matches id, it will create new object with original die but isHeld is opposite
        //otherwise just keet the same object that we had before

    }

    const diceElements = diceApp.map(die => 
        <Die 
             key={die.id}   
             value={die.value} 
             isHeld={die.isHeld}
             holdDice={() => holdDice(die.id)}
        />)
    
    return(
      <main>
        {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" 
                  onClick={rollDice}
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
  )
}
