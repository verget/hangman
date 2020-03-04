import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

import { MainService } from './main.service'
import { environment } from 'src/environments/environment'
import { answer } from './mocks/answer'
import { of } from 'rxjs'

describe('MainService', () => {
  let service: MainService
  let http: HttpTestingController
  const baseUrl: string = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainService]
    })
    service = TestBed.get(MainService)
    http = TestBed.get(HttpTestingController)
  })


  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should make request to expected url to get a random answer', () => {
    service.getRandomAnswer().subscribe();
    const url = `${baseUrl}/answers/0/`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([answer]);
    http.verify()
  })

  it('should decrypt the given string by expected way', () => {
    const expected = '3DHUBS'
    const encrypted = 'M0RIVUJT'
    const result = service.decryptMessage(encrypted)
    expect(result).toEqual(expected);
  })

  it('should call get answer method to start a game', async () => {
    spyOn(service, 'getRandomAnswer').and.returnValue(of(answer))
    await service.startNewGame()
    expect(service.getRandomAnswer).toHaveBeenCalled()
  })
})
