import React from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'

const App = () => {

  return (
    <Container>
      <TextContainer>
        <Text>Hello,</Text>
        <Text>I'm Bryan</Text>
        <Bar />
        <Bar marginLeft={3} />
        <Text font={1.5}>Software Engineer /</Text>
        <Text color={colors.red} font={1.3}>Gamer</Text>
      </TextContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: ${colors.darkGrey};
`

const TextContainer = styled.div`
  padding-top: 15rem;
  padding-left: 10rem;
`

const Text = styled.div`
  color: ${props=> props.color || colors.lightBlue};
  font-family: Consolas,monaco,monospace; 
  font-size: ${props => props.font || 4}rem;
`

const Bar = styled.div`
  background-color: ${colors.blue};
  margin: 1.5rem ${props => props.marginLeft || 0}rem;
  height: 4px;
  width: 8rem;
  border-radius: 100px;
`

export default App