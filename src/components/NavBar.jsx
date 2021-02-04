import React from 'react'
import styled from 'styled-components'
import Text from '/src/components/Text'

const NavBar = () => {

  return (
    <Container>
      <Text color={'white'} font={1}>Bryan Liang</Text>
        <IconContainter>
          <Icon />
          <Icon />
          <Icon />
        </IconContainter>
    </Container>
  )
}

const Container = styled.div`
  padding: 1.2em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const IconContainter = styled.div`
  display: flex;
  flex-direction: row;
`

const Icon = styled.div`
  margin-left: 5em;
  align-self: center;
  height: 5px;
  width: 5px;
  background-color: white;
`

export default NavBar