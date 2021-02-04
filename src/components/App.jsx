import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Text from '/src/components/Text'
import NavBar from '/src/components/NavBar'

const App = () => {

  const [pos, setPos] = useState(-50)

  useEffect(() => {
    setPos(0)
  }, [])

  return (
    <Container>
      <NavBar />
      <TextContainer>
        <AnimationContainer speed={.8} position={pos}>
          <Text>Hello,</Text>
        </AnimationContainer>
        <AnimationContainer speed={.95} position={pos}>
          <Text>I'm Bryan</Text>
        </AnimationContainer>
        <AnimationContainer speed={1.1} position={pos}>
          <Bar />
        </AnimationContainer>
        <AnimationContainer speed={1.2} position={pos}>
          <Bar marginLeft={3} />
        </AnimationContainer>
        <AnimationContainer speed={1.3} position={pos}>
          <Text font={1.5}>Software Engineer</Text>
          <Text color={colors.red} font={1.3}>Gamer</Text>
        </AnimationContainer>
      </TextContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: ${colors.darkGrey};
  flex-direction: column;
`

const TextContainer = styled.div`
  padding-top: 15rem;
  padding-left: 10rem;
`

const AnimationContainer = styled.div.attrs((props) => ({
  style: {
    transform: `translateX(${props.position}em)`
  }
}))`
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