import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Exercise} from "../model/exercise";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/exercises';
  exercisesRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.exercisesRef = db.list(this.dbPath, ref => ref.orderByChild('user').equalTo(localStorage.getItem('user')));
  }

  getAllExercises() {
    return this.exercisesRef;
  }

  getExercise(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addExercise(exercise: Exercise) {
    this.exercisesRef.push(exercise);
  }

  updateExercise(key: string, exercise: Exercise) {
    this.exercisesRef.update(key, exercise);
  }

  deleteExercise(key: string) {
    return this.exercisesRef.remove(key)
  }
}
