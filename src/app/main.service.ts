import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { getRandomInt } from './utils'
import { Game } from './game'

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {}

  public async startNewGame() {
    const answer = Game.answersDictionary[getRandomInt(4)]
    return new Game(answer)
  }

  public async loadLiderboard() {
    return []
  }
}

