
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task, TaskStatus, TaskPriority } from '../../models/task';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  taskId: string | null = null;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskApiService: TaskApiService
  ) {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['todo', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.taskId !== null;

    if (this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string): void {
    this.isLoading = true;

    this.taskApiService.getTasks().subscribe({
      next: (tasks) => {
        const task = tasks.find(item => item.id === id);

        if (!task) {
          this.errorMessage = 'Task not found.';
          this.isLoading = false;
          return;
        }

        this.form.patchValue({
          title: task.title,
          description: task.description ?? '',
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate
        });

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load task.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();

    const taskData: Omit<Task, 'id'> = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status as TaskStatus,
      priority: values.priority as TaskPriority,
      dueDate: values.dueDate
    };

    this.isLoading = true;
    this.errorMessage = '';

    if (this.taskId) {
      this.taskApiService.updateTask(this.taskId, taskData).subscribe({
        next: (task) => {
          this.isLoading = false;

          if (!task) {
            this.errorMessage = 'Task not found.';
            return;
          }

          this.router.navigate(['/tasks'], {
            queryParams: { message: 'updated' }
          });
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Failed to update task.';
        }
      });
    } else {
      this.taskApiService.createTask(taskData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/tasks'], {
            queryParams: { message: 'updated' }
          });
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Failed to create task.';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
