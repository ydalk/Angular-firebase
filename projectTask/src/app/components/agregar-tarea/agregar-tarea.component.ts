import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Tarea } from '../../models/tarea';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css']
})
export class AgregarTareaComponent implements OnInit {
  id: any;
  tarea: Tarea = new Tarea();
  submitted = false;
  btn_message: string;

  constructor(private tareasService: TareasService, private route: ActivatedRoute) {
    console.log('id: ', this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];               // Asignamos el 'id' (key) que nos acaba de llegar por la URL

    if (this.id != 'nueva') {
      this.editTask(this.id);
      this.btn_message = 'Editar';
      return;
    }
    this.btn_message = 'Crear';
  }

  ngOnInit() {
  }

  newTask(): void {
    this.submitted = false;
    this.tarea = new Tarea();
  }

  private editTask(id): void {
    this.submitted = false;
    this.getTaskById(id);
  }

  save() {

    if (this.id != 'nueva') {
      console.log('Save (Edit)', this.tarea);
      this.tareasService.editTask(this.tarea);
    }
    else {
      console.log('Save (New)', this.tarea);
      this.tareasService.createTask(this.tarea);
    }
    this.tarea = new Tarea();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  getTaskById(id) {
    this.findTaskById(id);
  }

  findTaskById(id) {
    // Use snapshotChanges() .map() para almacenar el ID
    var foundTask;

    this.tareasService.getTasks()
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )
      .subscribe(tasks => {
        if (this.existsTasks(tasks)) {
          tasks.forEach(task => {
            if (task.key === id) {
              console.log('Tarea:', task);
              this.tarea = task;
            }
          });
          console.log('Tarea Encontrada: ', this.tarea);
          //debugger;
          return;
        }
        console.log('No hay registros!');
      });

  }

  existsTasks(tasks) {
    return 0 < tasks.length;
  }

}
