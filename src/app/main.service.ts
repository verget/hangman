import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { getRandomInt } from './utils'
import { Game } from './game'

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {}

  public async startNewGame(): Promise<Game> {
    const answer = Game.answersDictionary[getRandomInt(4)]
    return new Game(this.decriptMessage(answer))
  }

  private decriptMessage(encodedText: string): string {
    return window.atob(encodedText)
    // just a Base64 encoding like a simplest way to obfuscate private message
  }

  public async loadLiderboard() {
    return []
  }
}

