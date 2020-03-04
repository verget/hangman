import { Game } from './game'

describe('Game class', () => {
  let game: Game

  beforeEach(() => {
    game = new Game('ABC')
  })

  afterEach(() => {
    game = null
  })

  it('should create an instance with expected parameters', () => {
    expect(game.score).toEqual(500)
    expect(game.isFinished).toBeFalse()
    expect(game.panel).toEqual(['_', '_', '_'])
    expect(game.answerLength).toEqual(3)
  })

  it('should be finished with max score if full word given', () => {
    game.checkAnswer('ABC')
    expect(game.isFinished).toBeTrue()
    expect(game.score).toEqual(500)
  })

  it('should change panel if right letter guessed', () => {
    game.checkAnswer('A')
    expect(game.panel).toEqual(['A', '_', '_'])
    expect(game.score).toEqual(500)
  })

  it('should change panel if right letter passed', () => {
    game.checkAnswer('A')
    expect(game.panel).toEqual(['A', '_', '_'])
    expect(game.score).toEqual(500)
  })

  it('should decrise score if wrong letter passed', () => {
    game.checkAnswer('D')
    expect(game.panel).toEqual(['_', '_', '_'])
    expect(game.score).toEqual(400)
  })

  it('should finish game if wrong letter passed 5 times', () => {
    game.checkAnswer('D')
    game.checkAnswer('D')
    game.checkAnswer('D')
    game.checkAnswer('D')
    game.checkAnswer('D')
    expect(game.panel).toEqual(['_', '_', '_'])
    expect(game.score).toEqual(0)
    expect(game.isFinished).toBeTrue()
  })
})
