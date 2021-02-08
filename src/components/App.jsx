import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Text from '/src/components/Text'
import NavBar from '/src/components/NavBar'
import GameCanvas from '/src/components/GameCanvas'
import BasicButton from '/src/components/BasicButton'

const App = () => {

  const [pos, setPos] = useState(-50)
  const [isPlayingGame, setIsPlayingGame] = useState(true)
  const [mousePos, setMousePos] = useState({x: 0, y: 0})

  const handleButtonClick = (e) => {
    AnimateOut(() => {setIsPlayingGame(true)})
    setMousePos({x: e.clientX, y: e.clientY})
  }

  const handleAboutMeClick = (e) => {
    setIsPlayingGame(false)
    AnimateIn()
  }

  const AnimateOut = (cb) => {
    setPos(-50)
    setTimeout(() => {
      cb()
    }, 700)
  }

  const AnimateIn = (cb) => {
    setPos(0)
  }

  const renderText = () => (
    <TextContainer>
        <AnimationContainerX speed={.8} position={pos}>
          <Text>Hello,</Text>
        </AnimationContainerX>
        <AnimationContainerX speed={.9} position={pos}>
          <Text>I'm Bryan</Text>
        </AnimationContainerX>
        <AnimationContainerX speed={1} position={pos}>
          <Bar />
        </AnimationContainerX>
        <AnimationContainerX speed={1.1} position={pos}>
          <Bar marginLeft={3} />
        </AnimationContainerX>
        <AnimationContainerX speed={1.1} position={pos}>
          <Text font={1.5}>Software Engineer / </Text>
          <Text color={colors.blue} font={1.3}>Gamer</Text>
        </AnimationContainerX>
        <AnimationContainerX speed={1.1} position={pos}>
          <GameStartButton 
            onClick={handleButtonClick}
            style={{marginTop: '1.7em'}}
          >
            <Text color={colors.lightBlue} font={1}>Play</Text>
          </GameStartButton>
        </AnimationContainerX>
      </TextContainer>
  )

  const renderNavbar = () => (
    <NavContainer>
      <AnimationContainerY speed={.8} position={pos}>
        <NavBar />
      </AnimationContainerY>
    </NavContainer>
  )
  
  return (
    <AppContainer>
      {renderNavbar()}
      {renderText()}
      {<GameCanvas 
        mousePos={mousePos} 
        isPlayingGame={isPlayingGame} 
        handleAboutMeClick={handleAboutMeClick}
      />}
    </AppContainer>
  )
}

const AppContainer = styled.div`
  background-color: ${colors.darkGrey};
  height: 100%;
`

const NavContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
`

const TextContainer = styled.div`
  position: absolute;
  z-index: 1;
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

const GameStartButton = styled(BasicButton)`
  margin-top: 1rem;
  border-color: ${colors.lightBlue};
`

export default App