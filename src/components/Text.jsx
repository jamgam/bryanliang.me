import React from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'

const Text = (props) => {

  return (
    <BasicText {...props} />
  )
}

const BasicText = styled.span`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  color: ${props=> props.color || colors.lightBlue};
  font-family: Consolas,monaco,monospace; 
  font-size: ${props => props.font || 4}rem;
`

export default Text