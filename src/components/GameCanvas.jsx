import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Game from '/src/canvas/Game'

const GameCanvas = (props) => {

  const { mousePos } = props

  const canvasRef = useRef(null)
  const [canvasContext, setCanvasContext] = useState(null)

  const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth})
  const [game, setGame] = useState(null) 

  const handleResize = useCallback(() => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth})
  }, [])

  useEffect(() => {

    window.addEventListener('resize',  handleResize)

    const context = canvasRef?.current?.getContext('2d')
    const newGame = new Game({ context, ...windowSize, mousePos })

    setGame(newGame)
    newGame.start()
  }, [])

  useEffect(() => {
    game?.resize(windowSize)
  }, [windowSize])
  
  return (
    <>
      <Canvas 
        ref={canvasRef} 
        width={windowSize.width}
        height={windowSize.height}>
      </Canvas>
    </>
  )
}

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

export default GameCanvas