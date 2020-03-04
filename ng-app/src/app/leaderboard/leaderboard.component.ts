import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Champion } from '../models/champion'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  public champions: Champion[]

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.champions = this.route.snapshot.data['champions']
  }

}
