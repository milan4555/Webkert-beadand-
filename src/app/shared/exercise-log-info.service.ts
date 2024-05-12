import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ExerciseLogInfo} from "../model/exercise-log-info";

@Injectable({
  providedIn: 'root'
})
export class ExerciseLogInfoService {

  private dbPath = '/execiseloginfos';
  exerciseLogInfoRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.exerciseLogInfoRef = db.list(this.dbPath);
  }

  getAllExerciseLogInfo() {
    return this.exerciseLogInfoRef;
  }

  getExerciseLogInfo(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addExerciseLogInfo(exerciseLogInfo: ExerciseLogInfo) {
    this.exerciseLogInfoRef.push(exerciseLogInfo);
  }

  updateExerciseLogInfo(key: string, exerciseLogInfo: ExerciseLogInfo) {
    this.exerciseLogInfoRef.update(key, exerciseLogInfo);
  }

  deleteExerciseLogInfo(key: string) {
    return this.exerciseLogInfoRef.remove(key)
  }

  getAllExerciseInfoByLogKey(key: string) {
    return this.db.list(this.dbPath, ref => ref.orderByChild('exerciseLogId').equalTo(key));
  }
}
