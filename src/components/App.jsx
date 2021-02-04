import React from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'
import Text from '/src/components/Text'
import NavBar from '/src/components/NavBar'

const App = () => {

  return (
    <Container>
      <NavBar />
      <TextContainer>
        <Text>Hello,</Text>
        <Text>I'm Bryan</Text>
        <Bar />
        <Bar marginLeft={3} />
        <Text font={1.5}>Software Engineer</Text>
        <Text color={colors.red} font={1.3}>Gamer</Text>
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

const Bar = styled.div`
  background-color: ${colors.blue};
  margin: 1.7rem ${props => props.marginLeft || 0}rem;
  height: 4px;
  width: 8rem;
  border-radius: 100px;
`

export default App