import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Text from '/src/components/Text'
import NavBar from '/src/components/NavBar'
import Game from '/src/components/Game'

const App = () => {

  const [pos, setPos] = useState(-60)
  // TODO: default isPlayingGame back to false
  const [isPlayingGame, setIsPlayingGame] = useState(false)
  const [count, setCount] = useState(0)
  const [canvasContext, setCanvasContext] = useState(null)

  const canvasRef = useRef(null)

  const handleButtonClick = useCallback((eveent) => {
    // setIsPlayingGame(true)
    setPos(-50)
  }, [])

  useEffect(() => {
    setPos(0)
  }, [])

  useEffect(() => {
    if (pos === -50) {
      setTimeout(() => {
        setIsPlayingGame(true)
      }, 800)
    }
  }, [pos])

  const renderText = () => (
    <TextContainer>
        <AnimationContainerX speed={.8} position={pos}>
          <Text>Hello,</Text>
        </AnimationContainerX>
        <AnimationContainerX speed={.95} position={pos}>
          <Text>I'm Bryan</Text>
        </AnimationContainerX>
        <AnimationContainerX speed={1.1} position={pos}>
          <Bar />
        </AnimationContainerX>
        <AnimationContainerX speed={1.2} position={pos}>
          <Bar marginLeft={3} />
        </AnimationContainerX>
        <AnimationContainerX speed={1.3} position={pos}>
          <Text font={1.5}>Software Engineer / </Text>
          <Text color={colors.red} font={1.3}>Gamer</Text>
        </AnimationContainerX>
        <AnimationContainerX speed={1.4} position={pos}>
          <GameButton 
            onClick={handleButtonClick}
          >
            <Text color={'white'} font={1}>I wanna shoot some stuff!</Text>
          </GameButton>
        </AnimationContainerX>
      </TextContainer>
  )

  const renderNavbar = () => (
    <AnimationContainerY speed={.9} position={pos}>
      <NavBar />
    </AnimationContainerY>
  )

  return (
    <>
      {isPlayingGame || renderNavbar()}
      {isPlayingGame || renderText()}
      {!isPlayingGame || <Game isPlayingGame={isPlayingGame} />}
    </>
  )
}

const GameButton = styled.button`
  display: inline-block;
  &:hover {
    border-width: 3px;
    cursor: pointer;
  }
  border-radius: 7px;
  padding: .4em 1em;
  align-items: center;
  justify-content: center;
  margin-top: 1.7em;
  border: solid black;
  border-width: 2px;
  background-color: ${colors.red};
`

const TextContainer = styled.div`
  z-index: 10;
  padding-top: 15rem;
  padding-left: 10rem;
`

const AnimationContainerX = styled.div`
  transform: translateX(${props => props.position}em); 
  transition: all ease ${props => props.speed || 1}s;
`

const AnimationContainerY = styled.div`
  transform: translateY(${props => props.position}em); 
  transition: all ease ${props => props.speed || 1}s;
`

const Bar = styled.div`
  background-color: ${colors.blue};
  margin: 1.7rem ${props => props.marginLeft || 0}rem;
  height: 4px;
  width: 8rem;
  border-radius: 100px;
`

export default App