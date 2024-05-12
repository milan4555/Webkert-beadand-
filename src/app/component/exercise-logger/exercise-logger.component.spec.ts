import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseLoggerComponent } from './exercise-logger.component';

describe('ExerciseLoggerComponent', () => {
  let component: ExerciseLoggerComponent;
  let fixture: ComponentFixture<ExerciseLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseLoggerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
