import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Game from '/src/canvas/Game'
import Text from '/src/components/Text'

import EndGamePrompt from '/src/components/EndGamePrompt'

const GameCanvas = (props) => {

  const { isPlayingGame, mousePos, handleAboutMeClick } = props

  const canvasRef = useRef(null)
  const [canvasContext, setCanvasContext] = useState(null)
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight, 
    width: window.innerWidth,
  })
  const [game, setGame] = useState(null)
  const [isAlive, setIsAlive] = useState(true)
  const [score, setScore] = useState(0)
  const [shells, setShells] = useState(10)
  const [duration, setDuration] = useState(0)
  const [fps, setFps] = useState(0)

  const handleResize = useCallback(() => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth})
  }, [])

  const handleGameEnd = ({score, time}) => {
    setIsAlive(false)
    const secondsTwoDecimals = (time/1000).toFixed(2)
    setDuration(secondsTwoDecimals)
  }
  
  const restartGame = () => {
    startGame(canvasContext)
  }

  useEffect(() => {
    window.addEventListener('resize',  handleResize)

    return () => {
      window.removeEventListener('mousemove')
      window.removeEventListener('mousedown')
      window.addEventListener('resize')
    }
  }, [])

  useEffect(() => {
    game?.resize(windowSize)
  }, [windowSize])

  useEffect(() => {
    if (isPlayingGame) {
      const context = canvasRef?.current?.getContext('2d', { alpha: false })
      setCanvasContext(context)
      startGame(context)
    }
  }, [isPlayingGame])

  const startGame = (context) => {
    setIsAlive(true)
    const newGame = new Game({ 
      context, 
      mousePos,
      handleGameEnd,
      setScore,
      setFps,
      setShells,
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

  const renderShotgunCounter = () => {

    let shellsGraphic = []
    for(let i = 0; i < shells; i++) {
      shellsGraphic.push(<Shell key={i} />)
    }

    return (
      <Shells>
        <ShellsContainer>
          {shellsGraphic}
        </ShellsContainer>
        <Text font={.5}>( left click )</Text> 
      </Shells>
    )
  } 


  const renderEndGamePrompt = () => (
    <EndGamePrompt
      isShown={isPlayingGame}
      score={score} 
      duration={duration} 
      restartGame={restartGame}
      handleAboutMeClick={handleAboutMeClick}
    />
  )

  return (
    <> 
      {isPlayingGame && renderShotgunCounter()}
      {isPlayingGame && renderScoreCounter()}
      {!isAlive && renderEndGamePrompt()}
      <Canvas 
        ref={canvasRef} 
        width={windowSize.width}
        height={windowSize.height}>
      </Canvas>
    </>
  )
}

const ShellsContainer = styled.div`
  width: 20rem; 
  display: flex;
`

const Shell = styled.div`
  margin: .5rem .5rem;
  background-color: yellow;
  height: 3rem;
  width: 1rem;
`

const Shells = styled.div`
  flex-direction: column;
  display: flex;
  padding: 1rem;
  z-index: 1;
  position: fixed;
  bottom: 0;
  pointer-events: none;
  transform: translate(-50%, -0%);
  left: 50%;
  align-items: center;
  justify-content: center;
`

const Score = styled.div`
  padding: 1rem;
  z-index: 2;
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