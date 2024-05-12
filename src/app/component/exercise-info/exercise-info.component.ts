import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {gymSession} from "../../model/gym-session";
import {ExerciseLog} from "../../model/exercise-log";
import {ExerciseLogInfo} from "../../model/exercise-log-info";
import {Exercise} from "../../model/exercise";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ExerciselogService} from "../../shared/exerciselog.service";
import {DataService} from "../../shared/data.service";
import {ExerciseLogInfoService} from "../../shared/exercise-log-info.service";
import {GymsessionService} from "../../shared/gymsession.service";
import {Router} from "@angular/router";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-exercise-info',
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatDivider,
    NgIf
  ],
  templateUrl: './exercise-info.component.html',
  styleUrl: './exercise-info.component.css'
})
export class ExerciseInfoComponent implements OnInit {

  gymSessions: gymSession[] = [];
  exerciseLogs: ExerciseLog[] = [];
  exerciseList: Exercise[] = [];
  usedExerciseInfos: ExerciseLogInfo[] = [];
  sessionNumber: string = '';
  isLoaded = false;

  constructor(private fb: FormBuilder,
              private exerciseLogService: ExerciselogService,
              private dataService: DataService,
              private exerciseLogInfoService: ExerciseLogInfoService,
              private gymSessionService: GymsessionService) {
  }

  ngOnInit(): void {
    this.getAllExerciseInfo();
  }

  getAllExerciseInfo() {
    this.gymSessionService.getAllGymSession()
      .snapshotChanges()
      .subscribe({
        next: result => {
          result.forEach(item => {
            let row = item.payload.toJSON() as gymSession;
            this.gymSessions.push({
              id: item.key || '',
              date: row.date,
              totalWeight: row.totalWeight,
              repCounter: row.repCounter,
              userId: row.userId,
              finished: row.finished
            })
            this.exerciseLogService.getAllExerciseLog(item.key || '')
              .snapshotChanges()
              .subscribe({
                next: result2 => {
                  result2.forEach(item2 => {
                    let row2 = item2.payload.toJSON() as ExerciseLog;
                    this.exerciseLogs.push({
                      id: item2.key || '',
                      exerciseId: row2.exerciseId,
                      sessionNumber: row2.sessionNumber,
                    })
                    this.dataService.getExercise(row2.exerciseId)
                      .snapshotChanges()
                      .subscribe({
                        next: result4 => {
                          let row4 = result4.payload.toJSON() as Exercise;
                          console.log(row2.exerciseId);
                          if (row4) {
                            this.exerciseList.push({
                              muscleType: row4.muscleType,
                              name: row4.name,
                              user: row4.user,
                              id: result4.key || ''
                            })
                          }
                        }
                      })
                    this.exerciseLogInfoService.getAllExerciseInfoByLogKey(item2.key || '')
                      .snapshotChanges()
                      .subscribe({
                        next: result3 => {
                          result3.forEach(item3 => {
                            let row3 = item3.payload.toJSON() as ExerciseLogInfo;
                            this.usedExerciseInfos.push({
                              id: item3.key || '',
                              exerciseLogId: row3.exerciseLogId,
                              rep: row3.rep,
                              type: row3.type,
                              weight: row3.weight,
                            })
                          })
                          this.isLoaded = true;
                        }
                      })
                  })
                }
              })
          })
        }
      })
  }
}
