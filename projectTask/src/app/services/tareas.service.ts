import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private dbPath = '/tareas';
  taskRef: AngularFireList<Tarea>;

  constructor(private db: AngularFireDatabase) {
    this.taskRef = db.list(this.dbPath);
  }

  getTasks(): AngularFireList<Tarea> {
    return this.taskRef;
  }

  private handleError(error) {
    console.log(error);
  }
}
