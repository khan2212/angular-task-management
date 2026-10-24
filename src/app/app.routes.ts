
import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'tasks/new',
    component: TaskFormComponent
  },
  {
    path: 'tasks/:id/edit',
    component: TaskFormComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
