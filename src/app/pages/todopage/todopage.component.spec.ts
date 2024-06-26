import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodopageComponent } from './todopage.component';

describe('TodopageComponent', () => {
  let component: TodopageComponent;
  let fixture: ComponentFixture<TodopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodopageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
