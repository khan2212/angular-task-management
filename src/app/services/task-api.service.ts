
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: '1',
      title: 'Learn Angular 19',
      description: 'Review standalone components and routing.',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-10-25'
    },
    {
      id: '2',
      title: 'Build Task List',
      description: 'Complete the task management table.',
      status: 'todo',
      priority: 'medium',
      dueDate: '2026-10-20'
    },
    {
      id: '3',
      title: 'Write Unit Tests',
      description: 'Test services, forms, and components.',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-10-20'
    }
  ]);

  readonly tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return of(this.tasksSubject.value.map(task => ({ ...task })));
  }

  createTask(taskData: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID()
    };

    this.tasksSubject.next([
      ...this.tasksSubject.value,
      newTask
    ]);

    return of({ ...newTask });
  }

  updateTask(
    id: string,
    changes: Partial<Task>
  ): Observable<Task | undefined> {
    const currentTasks = this.tasksSubject.value;
    const existingTask = currentTasks.find(task => task.id === id);

    if (!existingTask) {
      return of(undefined);
    }

    const updatedTask: Task = {
      ...existingTask,
      ...changes,
      id: existingTask.id
    };

    this.tasksSubject.next(
      currentTasks.map(task =>
        task.id === id ? updatedTask : task
      )
    );

    return of({ ...updatedTask });
  }

  deleteTask(id: string): Observable<boolean> {
    const currentTasks = this.tasksSubject.value;
    const exists = currentTasks.some(task => task.id === id);

    if (!exists) {
      return of(false);
    }

    this.tasksSubject.next(
      currentTasks.filter(task => task.id !== id)
    );

    return of(true);
  }
}
