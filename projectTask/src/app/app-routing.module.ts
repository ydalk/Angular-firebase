import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarTareaComponent } from './components/agregar-tarea/agregar-tarea.component';
import { TareasComponent } from './components/tareas/tareas.component';


const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareasComponent },
  { path: 'agregar/:id', component: AgregarTareaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
