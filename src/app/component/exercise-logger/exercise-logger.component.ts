import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExerciseLog} from "../../model/exercise-log";
import {ExerciselogService} from "../../shared/exerciselog.service";
import {Exercise} from "../../model/exercise";
import {DataService} from "../../shared/data.service";
import {NgOptimizedImage} from "@angular/common";
import {ExerciseLogInfoService} from "../../shared/exercise-log-info.service";
import {ExerciseLogInfo} from "../../model/exercise-log-info";
import {GymsessionService} from "../../shared/gymsession.service";
import {gymSession} from "../../model/gym-session";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exercise-logger',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './exercise-logger.component.html',
  styleUrl: './exercise-logger.component.css'
})
export class ExerciseLoggerComponent implements OnInit {
  exerciseLogForm!: FormGroup;
  exerciseLogInfoForm!: FormGroup;
  exerciseLogs: ExerciseLog[] = [];
  exercises: Exercise[] = [];
  usedExercise: Exercise[] = [];
  usedExerciseInfos: ExerciseLogInfo[] = [];
  sessionNumber: string = '';
  sumWeight: number = 0;
  sumRep: number = 0;
  ngOnInit(): void {
    this.getAllExerciseLog();
  }

  constructor(private fb: FormBuilder,
              private exerciseLogService: ExerciselogService,
              private dataService: DataService,
              private exerciseLogInfoService: ExerciseLogInfoService,
              private gymSessionService: GymsessionService,
              private router: Router) {
    this.exerciseLogForm = this.fb.group({
      exerciseId: new FormControl("", [Validators.required]),
      startWeight: new FormControl("", [Validators.required,Validators.min(1)]),
      rep: new FormControl("", [Validators.required, Validators.min(1)]),
      warmUp: new FormControl("", [Validators.required]),
      user: new FormControl("")
    })
    this.exerciseLogInfoForm = this.fb.group({
      exerciseLogId: new FormControl(""),
      weight: new FormControl("", [Validators.required]),
      rep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
    })
  }

  getAllExerciseLog() {
    this.gymSessionService.haveOpenSessionId(localStorage.getItem('user') || '')
      .snapshotChanges()
      .subscribe({
        next: (data4) => {
          this.sessionNumber = '';
          data4.forEach((item4) => {
            let row = item4.payload.toJSON() as gymSession;
            if (!row.finished) {
              this.sessionNumber = item4.key || '';
              this.exerciseLogService
                .getAllExerciseLog(this.sessionNumber)
                .snapshotChanges()
                .subscribe({
                  next: (data) => {
                    this.exerciseLogs = [];
                    this.usedExercise = [];
                    this.usedExerciseInfos = [];
                    this.sumWeight = 0;
                    this.sumRep = 0;
                    data.forEach((item) => {
                      let exerciseLog = item.payload.toJSON() as ExerciseLog;
                      this.exerciseLogs.push({
                        id: item.key || '',
                        exerciseId: exerciseLog.exerciseId,
                        sessionNumber: exerciseLog.sessionNumber,
                      });
                      this.exerciseLogInfoService.getAllExerciseLogInfo()
                        .snapshotChanges()
                        .subscribe({
                          next: (data3) => {
                            data3.forEach((item3) => {
                              let exerciseLogInfo = item3.payload.toJSON() as ExerciseLogInfo;
                              if (!this.usedExerciseInfos.find((ExerciseLogInfo) => ExerciseLogInfo.id === item3.key) && exerciseLogInfo.exerciseLogId == item.key) {
                                this.usedExerciseInfos.push({
                                  id: item3.key || '',
                                  exerciseLogId: exerciseLogInfo.exerciseLogId,
                                  weight: exerciseLogInfo.weight,
                                  rep: exerciseLogInfo.rep,
                                  type: exerciseLogInfo.type
                                })
                                this.sumWeight += exerciseLogInfo.weight * exerciseLogInfo.rep;
                                this.sumRep += exerciseLogInfo.rep;
                              }
                            })
                          }
                        })
                      this.dataService.getExercise(exerciseLog.exerciseId)
                        .snapshotChanges()
                        .subscribe({
                          next: (item2) => {
                            let exercise = item2.payload.toJSON() as Exercise;
                            this.usedExercise.push({
                              id: item2.key || '',
                              name: exercise.name,
                              muscleType: exercise.muscleType,
                              user: exercise.user
                            })
                          }
                        })
                    })
                  }
                })
            }
          })
        }
      })
    this.dataService
      .getAllExercises()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
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
      })
  }

  deleteExerciseLog(key: string) {
    this.exerciseLogService.deleteExerciseLog(key);
    this.usedExerciseInfos = [];
    this.sumWeight = 0;
    this.sumRep = 0;
  }

  deleteExerciseLogInfo(key: string) {
    this.exerciseLogInfoService.deleteExerciseLogInfo(key);
    this.usedExerciseInfos = [];
    this.sumWeight = 0;
    this.sumRep = 0;
  }

  onSubmit() {
    if (this.exerciseLogForm.valid) {
      let isalreadyIn = false;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = currentDate.getDate().toString().padStart(2, '0');
      if (this.sessionNumber == '') {
        this.sessionNumber = this.gymSessionService.addGymSession({
          id: '1',
          date: `${year}-${month}-${day}`,
          finished: false,
          totalWeight: 0,
          repCounter: 0,
          userId: localStorage.getItem('user') || ''
        })
      }
      for (let i = 0; i < this.usedExercise.length; i++) {
        if (this.usedExercise[i].id == this.exerciseLogForm.controls['exerciseId'].value) {
          isalreadyIn = true;
        }
      }
      let key = '';
      if (!isalreadyIn) {
        key = this.exerciseLogService.addExerciseLog({
          id: '1',
          exerciseId: this.exerciseLogForm.controls['exerciseId'].value,
          sessionNumber: this.sessionNumber || ''
        });
        this.exerciseLogInfoService.addExerciseLogInfo({
          id: '1',
          exerciseLogId: key,
          weight: parseInt(this.exerciseLogForm.controls['startWeight'].value),
          rep: parseInt(this.exerciseLogForm.controls['rep'].value),
          type: (this.exerciseLogForm.controls['warmUp'].value == 'true')
        });
      } else {
        alert('Ez már hozzá van adva! Kérlek új sort a kártyán adj meg!')
      }
      this.exerciseLogForm.reset();
      this.exerciseLogForm.setValue({exerciseId: '', warmUp: '', startWeight: '', rep: '', user: localStorage.getItem('user')});
      this.router.navigate(['/exercise-logger'])
    } else {
      this.exerciseLogForm.markAllAsTouched();
    }
  }

  onSubmitInfo(key: string) {
    this.usedExerciseInfos = [];
    this.sumWeight = 0;
    this.sumRep = 0;
    if(this.exerciseLogInfoForm.valid) {
      this.exerciseLogInfoService.addExerciseLogInfo({
        id: '1',
        exerciseLogId: key,
        weight: +this.exerciseLogInfoForm.controls['weight'].value,
        rep: +this.exerciseLogInfoForm.controls['weight'].value,
        type: (this.exerciseLogInfoForm.controls['type'].value == 'true')
      });
      this.exerciseLogInfoForm.reset();
    } else {
      this.exerciseLogInfoForm.markAllAsTouched();
    }
  }

  finishWorkout(sessionId: string) {
    let row = this.gymSessionService.getGymSession(sessionId);
    row.snapshotChanges()
      .subscribe({
        next: result => {
          let data = result.payload.toJSON() as gymSession;
          data.finished = true;
          data.totalWeight = this.sumWeight;
          data.repCounter = this.sumRep;
          this.gymSessionService.updateGymSession(sessionId, data);
          this.router.navigate(['/exercise-info']);
        }
      })
  }

  protected readonly localStorage = localStorage;
}
