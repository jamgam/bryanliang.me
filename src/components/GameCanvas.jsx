import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Game from '/src/canvas/Game'
import Text from '/src/components/Text'
import BasicButton from '/src/components/BasicButton'

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

  const handleResize = useCallback(() => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth})
  }, [])

  const handleGameEnd = () => {
    setIsInGame(false)
  }

  const handleOnButtonClick = () => {
    startGame(canvasContext)
  }

  useEffect(() => {

    window.addEventListener('resize',  handleResize)
    
    const context = canvasRef?.current?.getContext('2d')
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
      ...windowSize, 
    })
    newGame.start()
    setGame(newGame)
  }

  const renderEndGamePrompt = () => (
    <EndGamePrompt>
      <Text font={1}>
        Unlucky! You Lost
      </Text>
      <RestartButton onClick={handleOnButtonClick}>
        <Text color={'white'} font={1}>
          Try Again?
        </Text>
      </RestartButton>
    </EndGamePrompt>
  )

  const renderScoreCounter = () => (
    <Score>
      <Text>
        {`Score: ${score}`}
      </Text>
    </Score>
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
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
`

const RestartButton = styled(BasicButton)`
  margin-top: 1em;
`

const EndGamePrompt = styled.div`
  border-radius: 7px;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: rgba(255, 255, 255, .2)
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0px;
  left: 0px;
`

export default GameCanvas