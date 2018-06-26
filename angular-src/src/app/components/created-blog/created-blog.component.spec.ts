import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedBlogComponent } from './created-blog.component';

describe('CreatedBlogComponent', () => {
  let component: CreatedBlogComponent;
  let fixture: ComponentFixture<CreatedBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
