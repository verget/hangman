import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Game } from '../game'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public answerForm: FormGroup
  public game: Game

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.game = this.route.snapshot.data['game']
    this.answerForm = new FormGroup({
      attempt: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.maxLength(this.game.answerLength)
      ])
    })
  }

  public check(): void {
    if (this.answerForm.valid) {
      this.game.checkAnswer(this.answerForm.value.attempt)
      this.answerForm.reset()
    }
  }

  public reset(): void {
    location.reload()
  }
}
