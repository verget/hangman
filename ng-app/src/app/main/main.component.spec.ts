import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MainComponent } from './main.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('MainComponent', () => {
  let component: MainComponent
  let fixture: ComponentFixture<MainComponent>
  let de: DebugElement
  let el: HTMLElement
  const fakeGame = {
    answerLength: 1,
    checkAnswer: jasmine.createSpy('checkAnswer')
  }
  const fakeActivatedRoute = {
    snapshot: {
      data: {
        game: fakeGame
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
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
        de = fixture.debugElement.query(By.css('form'))
        el = de.nativeElement
      })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form should be invalid when empty', () => {
    component.answerForm.controls.attempt.setValue('')
    expect(component.answerForm.valid).toBeFalsy()
  })

  it('attempt field should be required', () => {
    const attempt = component.answerForm.controls.attempt
    expect(attempt.valid).toBeFalsy()

    attempt.setValue('')
    expect(attempt.hasError('required')).toBeTruthy()
  })

  it('attempt field should be invalid with symbols', () => {
    const attempt = component.answerForm.controls.attempt
    expect(attempt.valid).toBeFalsy()

    attempt.setValue('/')
    expect(attempt.hasError('pattern')).toBeTruthy()
  })

  it('attempt field should be invalid with long string', () => {
    const attempt = component.answerForm.controls.attempt
    expect(attempt.valid).toBeFalsy()

    attempt.setValue('x'.repeat(100))
    expect(attempt.hasError('maxlength')).toBeTruthy()
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
