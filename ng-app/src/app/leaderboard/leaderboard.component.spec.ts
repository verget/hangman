import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { LeaderboardComponent } from './leaderboard.component'
import { fakeChampion } from '../mocks/champion'

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent
  let fixture: ComponentFixture<LeaderboardComponent>
  const fakeActivatedRoute = {
    snapshot: {
      data: {
        champions: [fakeChampion]
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
