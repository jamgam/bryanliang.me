import hash from 'object-hash'

const graphQl = async (type, query) => {
  const url = window.location.protocol + "//" + window.location.host

  const response = await fetch(url + '/graphQl', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `${type} ${query}`,
      verificationHash: hash({query: `${type} ${query}`, key: process.env.SECRET_KEY})
    })
  })
  return response.json()
}

export const uploadScore = async ({score, duration, username = 'ANON'}) => {
  const type = 'mutation'
  const query = `
    {
      addScore(score: "${score}", username: "${username}", duration: "${duration}") {
        id
        score
        username
        duration
        date
      }
    }
  `
  return graphQl(type, query)
}

export const updateUsername = async ({id, username}) => {
  const type = 'mutation'
  const query = `
  {
    updateUsername(id: "${id}", username: "${username}") {
      username
      score
    }
  }
  `
  return graphQl(type, query)
}

export const getHighscores = async () => {
  const type = 'query'
  const query = `
    {
      highscores {
        id
        score
        username
        duration
        date
      }
    }
  `

  return graphQl(type, query)
}

