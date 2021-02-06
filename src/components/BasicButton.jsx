import React from 'react'
import styled from 'styled-components'
import { colors } from '/src/constants'

const BasicButton  = (props) => {
  return  (
    <GameButton {...props}>
      {props.children}
    </GameButton>
  )
}

const GameButton = styled.button`
  box-sizing: border-box;
  display: inline-block;
  &:hover {
    border-width: 3px;
    cursor: pointer;
  }
  border-radius: 7px;
  padding: .4em 1em;
  align-items: center;
  justify-content: center;
  border: solid black;
  border-width: 2px;
  background-color: ${colors.red};
  ${props => props.css || ''}
`

export default BasicButton