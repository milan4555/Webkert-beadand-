import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {DataService} from "../../shared/data.service";
import {Exercise} from "../../model/exercise";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    exerciseForm!: FormGroup;
    exercises: Exercise[] = [];
    exerciseId: string = '';

  @ViewChild('newExerciseForm') public newExerciseForm: ElementRef | undefined;

  ngOnInit(): void {
    // @ts-ignore
    this.getAllExercises(localStorage.getItem('user'))
  }

    constructor(private fb: FormBuilder, private dataService: DataService) {
      this.exerciseForm = this.fb.group({
        name: new FormControl("", [Validators.required]),
        muscleType: new FormControl("", [Validators.required]),
        user: new FormControl(""),
      })
    }

  emptyForm() {
    this.exerciseForm.reset();
    this.exerciseForm.setValue({name: '', muscleType: '', user: localStorage.getItem('user')});
    this.exerciseId = '';
  }

    getAllExercises(userId: string) {
      this.dataService
        .getAllExercises()
        .snapshotChanges()
        .subscribe({
          next: (data) => {
            this.exercises = [];
            data.forEach((item) => {
              let exercise = item.payload.toJSON() as Exercise;
              this.exercises.push({
                id: item.key || '',
                name: exercise.name,
                muscleType: exercise.muscleType,
                user: exercise.user
              });
            })
          }
        });
    }

    editExercise(key: string) {
      // @ts-ignore
      this.newExerciseForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
      this.getExercise(key);
      this.exerciseId = key;
    }

    getExercise(id: string) {
      this.dataService.getExercise(id).snapshotChanges().subscribe({
        next: (data) => {
          let exercise = data.payload.toJSON() as Exercise;
          this.exerciseForm.setValue(exercise);
        }
      })
    }

    removeExercise(key: string) {
      this.dataService.deleteExercise(key);
    }

    onSubmit() {
      if (this.exerciseForm.valid) {
        if (this.exerciseId != '') {
         this.dataService.updateExercise(
           this.exerciseId,
           this.exerciseForm.value
         );
        } else {
          this.dataService.addExercise(this.exerciseForm.value);
        }
        this.exerciseForm.reset();
        this.exerciseForm.setValue({name: '', muscleType: '', user: localStorage.getItem('user')});
      } else {
        this.exerciseForm.markAllAsTouched();
      }
    }

    getImagePath(muscleType: string): string {
    console.log(muscleType);
      switch (muscleType) {
        case 'Hát':
          return 'backIcon.png';
        case 'Mell':
          return 'chest.png';
        case 'Bicepsz':
          return 'biceps.png';
        case 'Tricepsz':
          return 'triceps.png';
        case 'Láb':
          return 'leg.png';
        case 'Váll':
          return 'shoulder.png';
      }

      return '';
    }

  protected readonly localStorage = localStorage;
}
