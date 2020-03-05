import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { MainComponent } from './main.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { fakeGame } from '../mocks/game'

describe('MainComponent', () => {
  let component: MainComponent
  let fixture: ComponentFixture<MainComponent>
  const fakeActivatedRoute = {
    snapshot: {
      data: {
        game: fakeGame
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [MainComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
      })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form should be invalid when empty', () => {
    component.answerForm.controls.attempt.setValue('')
    expect(component.answerForm.valid).toBeFalsy()
    component.championForm.controls.name.setValue('')
    expect(component.championForm.valid).toBeFalsy()
  })

  it('attempt field should be required', () => {
    const attempt = component.answerForm.controls.attempt
    expect(attempt.valid).toBeFalsy()

    attempt.setValue('')
    expect(attempt.hasError('required')).toBeTruthy()
  })

  it('name field should be required', () => {
    const name = component.championForm.controls.name
    expect(name.valid).toBeFalsy()

    name.setValue('')
    expect(name.hasError('required')).toBeTruthy()
  })

  it('attempt field should be invalid with symbols', () => {
    const attempt = component.answerForm.controls.attempt
    expect(attempt.valid).toBeFalsy()

    attempt.setValue('/')
    expect(attempt.hasError('pattern')).toBeTruthy()
  })

  it('name field should be invalid with symbols', () => {
    const name = component.championForm.controls.name
    expect(name.valid).toBeFalsy()

    name.setValue('/')
    expect(name.hasError('pattern')).toBeTruthy()
  })

  it('attempt field should be invalid with long string', () => {
    const attempt = component.answerForm.controls.attempt
    expect(attempt.valid).toBeFalsy()

    attempt.setValue('x'.repeat(100))
    expect(attempt.hasError('maxlength')).toBeTruthy()
  })

  it('name field should be invalid with short string', () => {
    const name = component.championForm.controls.name
    name.setValue('xx')
    expect(name.hasError('minlength')).toBeTruthy()
  })

  it('form should be valid with expected values', () => {
    component.answerForm.controls.attempt.setValue('S')
    expect(component.answerForm.valid).toBeTruthy()
  })

  it('should check form validity, call game method if valid and empty form', () => {
    component.check()
    expect(fakeGame.checkAnswer).not.toHaveBeenCalled()
    component.answerForm.controls.attempt.setValue('S')
    component.check()
    expect(fakeGame.checkAnswer).toHaveBeenCalled()
    expect(component.answerForm.controls.attempt.value).toBeNull()
  })
})

