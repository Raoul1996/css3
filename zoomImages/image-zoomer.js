'use strict'

class ImageZoomer {
  constructor () {
    this.element = document.querySelector('.zommer')
    this.target = document.querySelector('.target')
    this.canvas = document.querySelector('.zoomer-canvas')
    this.ctx = this.canvas.getContext('2d')

    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.update = this.update.bind(this)

    this.x = 0
    this.y = 0
    this.trackingTouch = false
    this.scheduledUpdate = false

    this.addEventListeners()
  }

  onStart (evt) {
    if (evt.target !== this.target) return

    evt.preventDefault()
    this.trackingTouch = true
  }

  onMove (evt) {
    if (!this.trackingTouch) return
    this.x = evt.touches[0].pageX
    this.y = evt.touches[0].pageY

    if (this.scheduledUpdate) return
    this.scheduledUpdate = true
    requestAnimationFrame(this.update)
  }

  onEnd () {
    this.trackingTouch = false
  }

  update () {
  this.trackingTouch = false
    this.element.style.transform = `translate(${this.x}px,${this.y}px)`
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

new ImageZoomer()