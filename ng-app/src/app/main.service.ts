import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators"

import { getRandomInt } from './utils'
import { Game } from './game'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  public async startNewGame(): Promise<Game> {
    const answer = await this.getRandomAnswer()
    return new Game(this.decryptMessage(answer))
  }

  public async getRandomAnswer(): Promise<string> {
    // return this.http.get(`${this.apiUrl}/randomAnswer`)
    //   .pipe(map((response: {type: string, value: string}) => response.value))
    return Game.answersDictionary[getRandomInt(4)]
  }

  public decryptMessage(encodedText: string): string {
    return window.atob(encodedText)
    // just a Base64 encoding like a simplest way to obfuscate private message
  }

  public async loadLiderboard() {
    return []
  }
}

