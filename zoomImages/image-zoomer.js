'use strict'

class ImageZoomer {
  constructor () {
    this.element = document.querySelector('.zommer')
    this.target = document.querySelector('.target')
    this.canvas = document.querySelector('.zoomer__canvas')
    this.ctx = this.canvas.getContext('2d')

    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.update = this.update.bind(this)

    this.zoomed = 0
    this.targetZoomed = 0

    this.x = 0
    this.y = 0
    this.trackingTouch = false
    this.scheduledUpdate = false

    this.initCanvas()
    this.addEventListeners()
    requestAnimationFrame(this.update)

  }

  initCanvas () {
    const width = 128
    const height = 128
    const dPR = window.devicePixelRatio || 1

    this.canvas.width = width * dPR
    this.canvas.height = height * dPR

    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`

    this.ctx.scale(dPR, dPR)
  }

  onStart (evt) {
    if (evt.target !== this.target) return

    evt.preventDefault()
    this.trackingTouch = true

    this.targetZoomed = 1
  }

  onMove (evt) {
    if (!this.trackingTouch) return
    this.x = evt.pageX || evt.touches[0].pageX
    this.y = evt.pageY || evt.touches[0].pageY

    if (this.scheduledUpdate) return
    this.scheduledUpdate = true
    requestAnimationFrame(this.update)
  }

  onEnd () {
    this.trackingTouch = false

    this.targetZoomed = 0
  }

  update () {
    const TAU = Math.PI * 2
    this.trackingTouch = false

    this.zoomed += (this.targetZoomed - this.zoomed) / 10

    this.ctx.fillStyle = '#ffffff'
    this.ctx.beginPath()
    this.ctx.arc(64,64,64,0, TAU)
    this.ctx.closePath()
    this.ctx.fill()

    this.element.style.transform = `translate(${this.x}px,${this.y}px)`

    requestAnimationFrame(this.update)

  }

  addEventListeners () {
    document.addEventListener('touchStart', this.onStart)
    document.addEventListener('touchMove', this.onMove)
    document.addEventListener('touchEnd', this.onEnd)
  }

  removeEventListeners () {
    document.removeEventListener('touchStart', this.onStart)
    document.removeEventListener('touchMove', this.onMove)
    document.removeEventListener('touchEnd', this.onEnd)
  }
}

window.addEventListener('load', () => {
  new ImageZoomer()
})