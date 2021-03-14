import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TareasService } from 'src/app/services/tareas.service';



@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tasks: any = '';

  constructor(private tareasService: TareasService) { }

  ngOnInit() {
    this.getTareasList();
  }

  getTareasList() {
    // Use snapshotChanges() .map() para almacenar el ID
    this.tareasService.getTasks()
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )
      .subscribe(tasks => {
        if (this.existsTasks(tasks)) {
          console.log(tasks);
          this.tasks = tasks;
          return;
        }
        this.tasks = '';
        console.log('No hay registros!');
      });

  }

  existsTasks(tasks) {
    return 0 < tasks.length;
  }

}
