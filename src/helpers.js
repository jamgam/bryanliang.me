
export const calculateNewPositionWithAngle = ({x, y}, angle, distance) => {
  const yOffset = Math.sin(angle)*distance
  const xOffset = Math.cos(angle)*distance
  return {
    x: x + xOffset,
    y: y + yOffset,
  }
}

export const calculateAngle = (point1, point2) => {
  return Math.atan2(point2.y - point1.y, point2.x - point1.x)
}

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * Math.floor(max - min)) + min
}

export const randomNum = (min, max) => {
  return (Math.random() * (max - min)) + min
}

export const calculateDistance = (point1, point2) => {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2)
}

export const calculateVelocityFromAngle = (speed, angle) => {
  const y = Math.sin(angle)* speed
  const x = Math.cos(angle)* speed
  return {x, y}
}

export const isOutOfBounds = (point, width, height, offset=0) => {
  return point.x < width + offset && point.y < height + offset && point.x > -(offset) && point.y > -(offset)
}


