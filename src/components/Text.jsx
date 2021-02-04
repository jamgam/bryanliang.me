import React from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'

const Text = (props) => {

  return (
    <BasicText {...props} />
  )
}

const BasicText = styled.div`
  color: ${props=> props.color || colors.lightBlue};
  font-family: Consolas,monaco,monospace; 
  font-size: ${props => props.font || 4}rem;
`

export default Text