import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Game } from '../models/game'
import { ActivatedRoute, Router } from '@angular/router'
import { MainService } from '../main.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public answerForm: FormGroup
  public championForm: FormGroup
  public game: Game

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.game = this.route.snapshot.data['game']
    this.answerForm = new FormGroup({
      attempt: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.maxLength(this.game.answerLength)
      ])
    })

    this.championForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.minLength(3)
      ])
    })
  }

  public check(): void {
    if (this.answerForm.valid) {
      this.game.checkAnswer(this.answerForm.value.attempt)
      this.answerForm.reset()
    }
  }

  public saveChampion(): void {
    if (this.championForm.valid) {
      this.mainService.saveChampion({
        name: this.championForm.value.name,
        score: String(this.game.score)
      })
        .subscribe(() => this.router.navigate(['leaderboard']))
    }
  }

  public reset(): void {
    location.reload()
  }
}
