import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Game from '/src/canvas/Game'
import Text from '/src/components/Text'

import EndGamePrompt from '/src/components/EndGamePrompt'


const GameCanvas = (props) => {

  const { mousePos } = props

  const canvasRef = useRef(null)
  const [canvasContext, setCanvasContext] = useState(null)
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight, 
    width: window.innerWidth,
  })
  const [game, setGame] = useState(null)
  const [isInGame, setIsInGame] = useState(true)
  const [score, setScore] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fps, setFps] = useState(0)

  const handleResize = useCallback(() => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth})
  }, [])

  const handleGameEnd = ({score, time}) => {
    setIsInGame(false)
    const secondsTwoDecimals = (time/1000).toFixed(2)
    setDuration(secondsTwoDecimals)
  }
  
  const restartGame = () => {
    startGame(canvasContext)
  }

  useEffect(() => {
    window.addEventListener('resize',  handleResize)
    const context = canvasRef?.current?.getContext('2d', { alpha: false })
    setCanvasContext(context)
    startGame(context)
  }, [])

  useEffect(() => {
    game?.resize(windowSize)
  }, [windowSize])

  const startGame = (context) => {
    setIsInGame(true)
    const newGame = new Game({ 
      context, 
      mousePos,
      handleGameEnd,
      setScore,
      setFps,
      ...windowSize,
    })
    newGame.start()
    setGame(newGame)
  }

  const renderScoreCounter = () => (
    <Score>
      <Text font={1.3}>
        {`Score: ${score} | FPS: ${Math.floor(fps)}`}
      </Text>
    </Score>
  )

  const renderEndGamePrompt = () => (
    <EndGamePrompt score={score} duration={duration} restartGame={restartGame} />
  )

  return (
    <> 
      {renderScoreCounter()}
      {!isInGame && renderEndGamePrompt()}
      <Canvas 
        ref={canvasRef} 
        width={windowSize.width}
        height={windowSize.height}>
      </Canvas>
    </>
  )
}

const Score = styled.div`
  padding: 1em;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0px;
  left: 0px;
`

export default GameCanvas