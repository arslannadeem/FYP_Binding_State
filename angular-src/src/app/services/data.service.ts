import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataService {

  course : any;
  topic : any;

  constructor() { }

  passValues(course : any, topic : any)
  {
      this.course=course;
      this.topic=topic;
  }

  getValues()
  {
    return {"course" : this.course,"topic" : this.topic};
  }
}