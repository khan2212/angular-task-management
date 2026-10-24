
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task';
import { TaskApiService } from '../../services/task-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  isLoading = false;
  errorMessage = '';
  searchText = '';
  selectedStatus = '';
  selectedPriority = '';
  successMessage = '';


  constructor(private taskApiService: TaskApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTasks();

    this.route.queryParamMap.subscribe(params => {
      const message = params.get('message');

      if (message === 'created') {
        this.successMessage = 'Task created successfully.';
      } else if (message === 'updated') {
        this.successMessage = 'Task updated successfully.';
      }
    });
  }

  loadTasks(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.taskApiService.tasks$.subscribe({
    next: tasks => {
      this.tasks = tasks;
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to load tasks.';
      this.isLoading = false;
    }
  });
}


  isOverdue(task: Task): boolean {
  const today = new Date().toISOString().split('T')[0];

  return task.dueDate < today &&
         task.status !== 'completed';
}



  confirmDelete(id: string): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) {
      return;
    }

    this.taskApiService.deleteTask(id).subscribe({
      next: (success) => {
        if (success) {
          this.tasks = this.tasks.filter(task => task.id !== id);
        } else {
          this.errorMessage = 'Task not found. It may already be deleted.';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to delete task.';
      }
    });
    this.successMessage = 'Task deleted successfully.';
  }


  openCreateTask(): void {
    this.router.navigate(['/tasks/new']);
  }



  get filteredTasks(): Task[] {
    const query = this.searchText.trim().toLowerCase();

    return this.tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(query);

      const matchesStatus =
        !this.selectedStatus ||
        task.status === this.selectedStatus;

      const matchesPriority =
        !this.selectedPriority ||
        task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }



  get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.status === 'completed').length;
  }

  get inProgressTasks(): number {
    return this.tasks.filter(task => task.status === 'in-progress').length;
  }

  get overdueTasks(): number {
    return this.tasks.filter(task =>
      this.isOverdue(task)
    ).length;
  }

  editTask(id: string): void {
    this.router.navigate(['/tasks', id, 'edit']);
  }



}
