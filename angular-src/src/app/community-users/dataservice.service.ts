import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataserviceService {


  private goals = new BehaviorSubject<any>([]);
  goal = this.goals.asObservable();
  constructor() {
  }

  changeGoal(goal) {

    this.goals.next(goal);

  }

}
