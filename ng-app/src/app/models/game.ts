import { findAllOccurrence } from '../utils'

export class Game {
  public score: number
  public panel: string[]
  private stateCounter: number
  private answer: string
  public isFinished: boolean
  private static statePictures = [
    `
      +---+
      |   |
          |
          |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
          |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========
    `
  ]

  constructor(answer: string) {
    this.score = 500
    this.stateCounter = 0
    this.isFinished = false
    this.answer = answer
    this.panel = new Array(this.answerLength).fill('_')
  }

  public get statePicture() {
    return Game.statePictures[this.stateCounter]
  }

  public get answerLength() {
    return this.answer.length
  }

  public checkAnswer(attempt: string) {
    if (attempt === this.answer) {
      this.finish()
      return
    }
    const hits = findAllOccurrence(this.answer, attempt)
    if (hits.length) {
      for (let i = 0; i < hits.length; i++) {
        this.panel[hits[i]] = attempt
        if (!this.panel.includes('_')) {
          this.finish()
        }
      }
    } else {
      this.score -= 100
      this.stateCounter++
      if (!this.score) {
        this.finish()
      }
    }
  }

  public stateUp() {
    this.stateCounter++
  }

  public finish(): void {
    this.isFinished = true
  }
}
