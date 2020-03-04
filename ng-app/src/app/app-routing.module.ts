import { NgModule, Injectable } from '@angular/core'
import {
  Routes,
  RouterModule,
  Resolve
} from '@angular/router'
import { MainComponent } from './main/main.component'
import { MainService } from './main.service'
import { Observable } from 'rxjs'
import { LeaderboardComponent } from './leaderboard/leaderboard.component'
import { Champion } from './models/champion'

@Injectable({ providedIn: 'root' })
export class GameResolver implements Resolve<string> {
  constructor(private service: MainService) {}

  resolve(): Observable<any> | Promise<any> {
    return this.service.startNewGame()
  }
}

@Injectable({ providedIn: 'root' })
export class LeaderboardResolver implements Resolve<Champion[]> {
  constructor(private service: MainService) {}

  resolve(): Observable<Champion[]> {
    return this.service.loadLiderboard()
  }
}

const routes: Routes = [
  {
    path: 'main',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    resolve: {
      game: GameResolver
    }
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    resolve: {
      champions: LeaderboardResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
