import './Background.css'
import React, { useRef, useEffect } from 'react'

function seekBetween({ seekPoint, min = 0, max = 1} = {}) {
  return seekPoint * (max - min) + min
}

function randomBetween(options) {
  return seekBetween({
    seekPoint: Math.random(),
    ...options,
  })
}

function chooseOne(array) {
  return array[Math.floor(randomBetween({ max: array.length }))]
}

const maxDuration = 120
const ms = 1000

const items = Array.from({length: 13}, () => ({
  width: randomBetween({ min: 80, max: 150 }),
  height: randomBetween({ min: 80, max: 150 }),
  ...(chooseOne([
    {
      animationName: 'slide-down',
      left: randomBetween({ max: window.innerWidth - 150 }),
    },
    {
      animationName: 'slide-right',
      top: randomBetween({ max: window.innerHeight - 150 }),
    },
  ])),
  animationDirection: Math.round(randomBetween()) ? 'normal' : 'reverse',
  animationDuration: randomBetween({ min: maxDuration -50, max: maxDuration }) * ms,
  currentPosition: randomBetween({ min: 0, max: maxDuration }) * ms,
}))

let lastIteration
const generateRender = (item) => {
  const currentIteration = Date.now()
  const delta = currentIteration - lastIteration

  // update timing
  item.currentPosition += delta
  if (item.currentPosition > item.animationDuration) {
    item.currentPosition -= item.animationDuration
  }

  const getPosition = (size, viewport) => seekBetween({
    ...({
      'normal': { max: viewport, min: -size },
      'reverse': { max: -size, min: viewport },
    }[item.animationDirection]),
    seekPoint: item.currentPosition / item.animationDuration,
  })

  return {
    width: item.width,
    height: item.height,
    ...({
      'slide-down': { left: item.left, top: getPosition(item.height, window.innerHeight) },
      'slide-right': { top: item.top, left: getPosition(item.width, window.innerWidth) },
    }[item.animationName]),
  }
}

const renderPayload = []

const step = () => {
  renderPayload.length = 0
  renderPayload.push(...items.map(generateRender))
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2
  if (height < 2 * radius) radius = height / 2
  this.beginPath()
  this.moveTo(x + radius, y)
  this.arcTo(x + width, y, x + width, y + height, radius)
  this.arcTo(x + width, y + height, x, y + height, radius)
  this.arcTo(x, y + height, x, y, radius)
  this.arcTo(x, y, x + width, y, radius)
  this.closePath()
  return this
}

function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    lastIteration = Date.now()
    window.renderPayload = renderPayload

    const canvas = canvasRef.current
    const g = canvas.getContext('2d')
    const height = g.canvas.height = window.innerHeight
    const width = g.canvas.width = window.innerWidth
    const cardRadius = window.getComputedStyle(canvas).getPropertyValue('--card-border-radius')

    let frameId = null
    const frame = () => {
      g.clearRect(0, 0, width, height)

      step()

      renderPayload.forEach((style) => {
        g.shadowBlur = 50
        g.shadowColor = 'rgba(0, 0, 0, 0.5)'
        g.roundRect(style.left, style.top, style.width, style.height, parseInt(cardRadius, 10))
        g.fillStyle = 'rgba(255, 255, 255, 0.07)'
        g.fill()
      })

      lastIteration = Date.now()
      // loop
      frameId = window.requestAnimationFrame(frame)
    }

    frameId = window.requestAnimationFrame(frame)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  })

  return (
    <canvas ref={canvasRef} className="background"></canvas>
  )
}

export default Background
