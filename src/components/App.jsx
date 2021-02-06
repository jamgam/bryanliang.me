import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Text from '/src/components/Text'
import NavBar from '/src/components/NavBar'
import GameCanvas from '/src/components/GameCanvas'

const App = () => {

  const [pos, setPos] = useState(-60)
  // TODO: default isPlayingGame back to false
  const [isPlayingGame, setIsPlayingGame] = useState(false)
  const [count, setCount] = useState(0)
  const [canvasContext, setCanvasContext] = useState(null)
  const [mousePos, setMousePos] = useState({x: 0, y: 0})

  const canvasRef = useRef(null)

  const handleButtonClick = useCallback((e) => {
    // setIsPlayingGame(true)
    setPos(-50)
    setMousePos({x: e.clientX, y: e.clientY})
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
            <Text color={'white'} font={1}>I wanna play a GAME! (WIP)</Text>
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
    <AppContainer>
      {!isPlayingGame && renderNavbar()}
      {!isPlayingGame && renderText()}
      {isPlayingGame && <GameCanvas mousePos={mousePos} isPlayingGame={isPlayingGame} />}
    </AppContainer>
  )
}

const AppContainer = styled.div`
  background-color: ${colors.darkGrey};
  height: 100%;
`

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
  background-color: rgba(0, 0, 0, 0);
`

const AnimationContainerX = styled.div`
  background-color: rgba(0, 0, 0, 0);
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