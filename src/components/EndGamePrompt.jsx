import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Leaderboard from '/src/components/Leaderboard'
import { colors } from '/src/constants'
import BasicButton from '/src/components/BasicButton'
import Text from '/src/components/Text'
import { getHighscores, uploadScore, updateUsername } from '/src/helpers/requests'


const EndGamePrompt = ({isShown, handleAboutMeClick, score, duration, restartGame}) => {

  const [highscores, setHighscores] = useState([])
  const [rank, setRank] = useState(null)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (rank !== null) {
      submitHighScore()
    }
  }, [rank])

  const handleOnClick = () => {
    restartGame()
    rank && submitUsername(false)
  } 

  const init = async () => {
    const scores = await getScores()
    getRank(scores)
  } 

  const getScores = async () => {
    const resp = await getHighscores()
    const scores = resp?.data?.highscores || []

    setHighscores(scores)
    return scores
  }

  const getRank = (scores) => {
    let scoreRank = scores.length < 10 ? scores.length + 1 : null
    for (let i = scores.length; i >= 0; i--) {
      if (score > scores[i]?.score) {
        scoreRank = i + 1
      }
    }
    setRank(scoreRank)
    setIsEditingUsername(scoreRank !== null)
  }

  const submitHighScore = async () => {
    await uploadScore({score, duration})
    getScores()
  }

  const submitUsername = (refresh = true) => {
    text && updateUsername({id: highscores[rank-1].id, username: text})
    if (refresh) {
      setIsEditingUsername(false)
      getScores()
    }
  } 

  const renderHighscore = () => (
    <Highscore>
      <Text font={1.5}>
        {`Well Played! You ranked #${rank}`}
      </Text>
    </Highscore>
  )

  return (
    <PromptContainer isShown={isShown}>
      {rank !== null && renderHighscore()}
      <Leaderboard 
        text={text}
        setText={setText}
        submitUsername={submitUsername} 
        isEditingUsername={isEditingUsername} 
        highscores={highscores} 
        rank={rank} 
      />
      <Text font={1.3}>
        {`You scored:`} <Text font={2}>{score}</Text>
      </Text>
      <Text font={1.3}>
        {`in ${duration} seconds`}
      </Text>
      <RestartButton onClick={handleOnClick}>
        <Text color={colors.lightBlue} font={1.3}>
          AGAIN!
        </Text>
      </RestartButton>
      <AboutMeButton onClick={handleAboutMeClick}>
        <Text color={colors.lightBlue} font={.7}>
          About Me
        </Text>
      </AboutMeButton>
    </PromptContainer>
  )
}

const Highscore = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const PromptContainer = styled.div`
  border-radius: 7px;
  border-width: 2px;
  border-color: ${colors.blue};
  border-style: line;
  position: absolute;
  display: ${props => props.isShown ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: transparent;
`

const RestartButton = styled(BasicButton)`
  margin-top: 1rem;
  border-color: ${colors.lightBlue};
`

const AboutMeButton = styled(BasicButton)`
  border-radius: 1rem;
  margin-top: 1rem;
  padding: .2rem .5rem;
  border-color: ${colors.lightBlue};
`

export default EndGamePrompt