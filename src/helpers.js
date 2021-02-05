
export const calculateNewPosition = ({x, y}, angle, distance) => {
  const yOffset = Math.sin(angle)*distance
  const xOffset = Math.cos(angle)*distance
  return {
    x: x + xOffset,
    y: y + yOffset,
  }
}
