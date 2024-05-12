import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ExerciseLog} from "../model/exercise-log";
import {ExerciseLogInfoService} from "./exercise-log-info.service";
import {ExerciseLogInfo} from "../model/exercise-log-info";



@Injectable({
  providedIn: 'root'
})
export class ExerciselogService {
  private dbPath = '/execiselogs';
  exerciseLogRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private exerciseInfoLogService: ExerciseLogInfoService) {
    this.exerciseLogRef = db.list(this.dbPath);
  }

  getAllExerciseLog(sessionNumber: string) {
    return this.db.list(this.dbPath, ref => ref.orderByChild('sessionNumber').equalTo(sessionNumber));
  }

  getExerciseLog(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addExerciseLog(exerciseLog: ExerciseLog): string {
    const newItem = this.exerciseLogRef.push(exerciseLog);
    return <string>newItem.key;
  }

  exerciseLogIsAlreadyIn(name: string) {
    this.db.list(this.dbPath)
  }

  updateExerciseLog(key: string, exerciseLog: ExerciseLog) {
    this.exerciseLogRef.update(key, exerciseLog);
  }

  deleteExerciseLog(key: string) {
    return this.exerciseLogRef.remove(key);
  }
}
