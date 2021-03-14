import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TareasService } from 'src/app/services/tareas.service';



@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tareas: any = '';

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
      .subscribe(tareas => {
        if (this.existsTasks(tareas)) {
          this.tareas = tareas;
          console.log(this.tareas)
          return;
        }
        this.tareas = '';
        console.log('No hay registros!');
      });

  }

  existsTasks(tareas) {
    return 0 < tareas.length;
  }

  // TrackBy
  trackByFn(index: number, tarea: any): number {
    return tarea.key;
  }

  updateActiveField(isActive: boolean, tarea) {
    this.tareasService.updateActiveField(
      tarea.key,
      {
        completada: isActive
      }
    );
  }

}
