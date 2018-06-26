import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletedblogComponent } from './seletedblog.component';

describe('SeletedblogComponent', () => {
  let component: SeletedblogComponent;
  let fixture: ComponentFixture<SeletedblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeletedblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeletedblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
