import React from 'react'
import styled from 'styled-components'
import Text from '/src/components/Text'
import GithubLogo from '/src/images/GitHub-Mark-Light-32px.png'
import LinkedInLogo from '/src/images/LinkedIn-32px.png'

const NavBar = () => {

  return (
    <Container>
      <Text color={'white'} font={1}>Bryan Liang</Text>
        <IconContainter>
          <a href="https://linkedin.com/in/bryanliang1995">
            <Icon src={LinkedInLogo} />
          </a>
          <a href="https://github.com/jamgam">
            <Icon src={GithubLogo} />
          </a>
        </IconContainter>
    </Container>
  )
}

const Container = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const IconContainter = styled.div`
  display: flex;
  flex-direction: row;
`

const Icon = styled.img`
  margin-left: 4rem;
  align-self: center;
  height: 2rem;
  width: 2rem;
  background-color: transparent;
`

export default NavBar