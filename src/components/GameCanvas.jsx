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
  const [fps, setFps] = useState(0)

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

  const renderEndGamePrompt = () => (
    <EndGamePrompt>
      <Text font={1.5}>
        Game!
      </Text>
      <Text font={1.5}>
        {`Your score was: ${score}`}
      </Text>
      <RestartButton onClick={handleOnButtonClick}>
        <Text color={colors.lightBlue} font={1.5}>
          Try Again?
        </Text>
      </RestartButton>
    </EndGamePrompt>
  )

  const renderScoreCounter = () => (
    <Score>
      <ScoreText font={1.5}>
        {`Score: ${score} | FPS: ${Math.floor(fps)}`}
      </ScoreText>
    </Score>
  )

  return (
    <> 
      {renderScoreCounter()}
      {!isInGame && renderEndGamePrompt()}
      {/* {renderEndGamePrompt()} */}
      <Canvas 
        ref={canvasRef} 
        width={windowSize.width}
        height={windowSize.height}>
      </Canvas>
    </>
  )
}

const ScoreText = styled(Text)`
`

const Score = styled.div`
  padding: 1em;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
`

const RestartButton = styled(BasicButton)`
  margin-top: 1em;
  border-color: ${colors.lightBlue};
`

const EndGamePrompt = styled.div`
  border-radius: 7px;
  border-width: 2px;
  border-color: ${colors.blue};
  border-style: line;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: transparent;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0px;
  left: 0px;
`

export default GameCanvas