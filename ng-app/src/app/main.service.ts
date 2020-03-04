import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators"

import { Game } from './models/game'
import { environment } from '../environments/environment'
import { Champion } from './models/champion'

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  public startNewGame(): Observable<Game> {
    return this.getRandomAnswer().pipe(map(answer => new Game(answer)))
  }

  public getRandomAnswer(): Observable<string> {
    return this.http.get(`${this.apiUrl}/answers/0/`)
      .pipe(map((response: any) => this.decryptMessage(response)))
  }

  public decryptMessage(encodedText: string): string {
    return window.atob(encodedText)
    // just a Base64 encoding like a simplest way to obfuscate private message
  }

  public saveChampion(data: Champion): Observable<void> {
    return this.http.post(`${this.apiUrl}/champions/`, data)
      .pipe(map((response: any) => console.log(response)))
  }
 
  public loadLiderboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/champions/`)
      .pipe(map((response: { count: number, results: Champion[] }) => response.results))
  }
}

