import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Text from '/src/components/Text'
import { colors, GAME_VALUES } from '/src/constants'
import { updateUsername } from '/src/helpers/requests'

const Leaderboard = ({ text, setText, isEditingUsername, submitUsername, highscores = [], rank }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    submitUsername()
  }

  const handleChange = (e) => {
    if ((e.target.value).length <= 12) {
      setText(e.target.value)
    }
  }

  const renderInputField = () => (
    <form onSubmit={handleSubmit}>
      <UsernameInput value={text} onChange={handleChange} autoFocus={true} placeholder={GAME_VALUES.USERNAME_PLACEHOLDER} type={'text'} />
    </form>
  )

  return !!highscores.length && (
    <LeaderboardContainer>
      <Header>
        <tr>
          <th colSpan={3}>
            <Text font={1.2}>High Scores</Text>
          </th>
        </tr>
      </Header>
      <TableBody>
        <tr>
            <td><Text font={1}>#</Text></td>
            <UsernameContainer><Text font={1}>Name</Text></UsernameContainer>
            <td><Text font={1}>Score</Text></td>
        </tr>
        {highscores.map(({score = '???', username = '?????', id}, i) => {

          const isUser = rank - 1 === i
        
          return (
            <Row highlight={isUser && isEditingUsername} key={id || i}>
              <td><Text font={1}>{i+1}</Text></td>
              <UsernameContainer>
                  {isUser && isEditingUsername
                    ? renderInputField()
                    : <Text font={1}>{username}</Text>
                  }
              </UsernameContainer>
              <Score><Text font={1}>{score}</Text></Score>
            </Row>
          )
        })}
      </TableBody>
    </LeaderboardContainer>
  )
}

const UsernameContainer = styled.td`
  padding-left: 1rem;
  width: 100%;
`

const LeaderboardContainer = styled.table`
  border-collapse: collapse;
  padding: 1rem;
  border: none;
  max-width: 17rem;
  min-width: 17rem;
  width: 17rem;
`

const UsernameInput = styled.input`
  padding: 0px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px red;
    border: none;
  }
  outline: none;
  border: none;
  font-size: .9rem;
  color: ${colors.lightBlue};
  background-color: transparent;
  font-family: Consolas,monaco,monospace; 
`

const TableBody = styled.tbody`
  border-width: 3px;
`

const Row = styled.tr`
  background-color: ${props => props.highlight ? colors.red : 'transparent'};
  padding: -5rem 0rem;
`

const Header = styled.thead`
  margin-bottom: 1rem;
`

const Score = styled.td`
  border-width: 3px;
  float: right;
`

export default Leaderboard

