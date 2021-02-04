import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Text from '/src/components/Text'
import Player from '/src/canvas/Player'

const Game = (props) => {

  const canvasRef = useRef(null)
  const [canvasContext, setCanvasContext] = useState(null)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [player, setPlayer] = useState(null)

  const [playerPosition, setPlayerPosition] = useState({x: window.innerWidth/2, y: window.innerHeight/2})


  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)
  }, [])

  const handleMouseMove = useCallback((e) => {
    setPlayerPosition({x: e.offsetX, y: e.offsetY})
  }, [])

  const update = () => {
    
    canvasContext.save()

    canvasContext.fillStyle = colors.darkGrey
    canvasContext.globalAlpha = .7
    canvasContext.fillRect(0, 0, windowWidth, windowHeight)
    canvasContext.globalAlpha = 1

    let updatedPlayerPosition
    setPlayerPosition(playerPosition => {
      updatedPlayerPosition = playerPosition
      return playerPosition
    })
    
    player.render(updatedPlayerPosition)

    canvasContext.restore()

    requestAnimationFrame(() => update())
  }

  useEffect(() => {
    window.addEventListener('resize',  handleResize)
    window.addEventListener('mousemove',  handleMouseMove)

    const context = canvasRef?.current?.getContext('2d')
    setCanvasContext(context)
  }, [])
  
  useEffect(() => {
    console.log('effect', canvasContext)
    
    if (canvasContext) {
      setPlayer(new Player({context: canvasContext}))
    }
  }, [canvasContext])

  useEffect(() => {
    if (player) {
      requestAnimationFrame(() => update())
    }
  }, [player])



  return (
    <>
      <GameCanvas 
        ref={canvasRef} 
        width={windowWidth}
        height={windowHeight}>
      </GameCanvas>
      <Text>
        {`${windowHeight} x ${windowWidth}`}
      </Text>
    </>
  )
}

// background-color: transparent;
const GameCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

export default Game