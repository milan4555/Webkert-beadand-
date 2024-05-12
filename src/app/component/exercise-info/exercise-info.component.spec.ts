import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseInfoComponent } from './exercise-info.component';

describe('ExerciseInfoComponent', () => {
  let component: ExerciseInfoComponent;
  let fixture: ComponentFixture<ExerciseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
