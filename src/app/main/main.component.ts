import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Game } from '../game'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public answerForm: FormGroup
  public game: Game

  async ngOnInit(): Promise<void> {
    this.game = new Game()
    await this.game.launch()
    console.log(this.game.answerLength)
    this.answerForm = new FormGroup({
      attempt: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.maxLength(this.game.answerLength)
      ])
    })
  }

  check() {
    if (this.answerForm.valid) {
      this.game.checkAnswer(this.answerForm.value.attempt)
      this.answerForm.reset()
    }
  }

  reset() {
    location.reload()
  }
}
