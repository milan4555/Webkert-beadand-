import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ExerciseLogInfoService} from "./exercise-log-info.service";
import {ExerciseLog} from "../model/exercise-log";
import {ExerciseLogInfo} from "../model/exercise-log-info";
import {gymSession} from "../model/gym-session";

@Injectable({
  providedIn: 'root'
})
export class GymsessionService {
  private dbPath = '/gymsession';
  gymSessionRef: AngularFireList<any>;
  openSessionCounter = 0;
  constructor(private db: AngularFireDatabase, private exerciseInfoLogService: ExerciseLogInfoService) {
    this.gymSessionRef = db.list(this.dbPath, ref => ref.orderByChild('userId').equalTo(localStorage.getItem('user')));
  }

  getAllGymSession() {
    return this.gymSessionRef;
  }

  getGymSession(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addGymSession(gymSession: gymSession): string {
    const newItem = this.gymSessionRef.push(gymSession);
    return <string>newItem.key;
  }

  updateGymSession(key: string, gymSession: gymSession) {
    this.gymSessionRef.update(key, gymSession);
  }

  // @ts-ignore
  haveOpenSessionId(user: string) {
    return this.db.list(this.dbPath, ref => ref.orderByChild('userId').equalTo(user));
  }

  deleteGymSession(key: string) {
    this.gymSessionRef.remove(key);
  }
}
