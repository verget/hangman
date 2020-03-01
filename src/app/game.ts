import { getRandomInt, findAllOccurrence } from './utils'

export class Game {
  public score: number
  public panel: string[]
  private stateCounter: number
  private isFinished: boolean
  private answer: string
  private static answersDictionary = [
    '3DHUBS',
    'MARVIN',
    'PRINT',
    'FILAMENT',
    'ORDER',
    'LAYER'
  ]
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

  constructor() {
    this.score = 500
    this.stateCounter = 0
    this.isFinished = false
    this.answer = ''
  }

  public get statePicture() {
    return Game.statePictures[this.stateCounter]
  }

  public get answerLength() {
    return this.answer.length
  }

  public async launch() {
    this.answer = await this.loadAnswer()
    this.panel = new Array(this.answerLength).fill('_')
    return Promise.resolve()
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

  private async loadAnswer(): Promise<string> {
    return Game.answersDictionary[getRandomInt(4)]
  }

  public finish(): void {
    this.isFinished = true
  }
}
