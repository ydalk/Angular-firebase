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

  createTask(tarea: Tarea): void {
    this.taskRef.push(tarea);
  }

  editTask(tarea: Tarea): void {
    console.log('Service: (editTask)', tarea);
    this.taskRef.set(
      tarea.key,
      {
        tarea: tarea.tarea,
        descripcion: tarea.descripcion,
        prioridad: tarea.prioridad,
        estado: tarea.estado,
        responsable: tarea.responsable,
        completada: tarea.completada,
      }
    )
      .then(_ => console.log('Registro Actualizado!'))
      .catch(error => this.handleError(error));
    console.log('Service: ', tarea);
  }

  updateActiveField(key: string, value: any) {
    this.taskRef.update(key, value)
      .then(_ => console.log('Registro actualizado exitosamente!'))
      .catch(error => this.handleError(error));
  }

  eliminarTarea( id ): void {
    this .taskRef .remove( id )
      .then( _ => console .log( 'Registro eliminado exitosamente!' ) )
      .catch( error => this .handleError( error ) );
  }

  eliminarTodas(): void {
    this .taskRef .remove()
      .catch( error => this .handleError( error ) );
  }
  private handleError(error) {
    console.log(error);
  }
}
