import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, Project, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks$: Observable<Task[]>;
  projects$: Observable<Project[]>;
  taskStats = {
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0
  };

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
    this.projects$ = this.taskService.getProjects();
  }

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      this.calculateTaskStats(tasks);
    });
  }

  private calculateTaskStats(tasks: Task[]) {
    this.taskStats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === TaskStatus.TODO).length,
      inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      done: tasks.filter(t => t.status === TaskStatus.DONE).length
    };
  }

  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      default: return 'priority-low';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case TaskStatus.DONE: return 'status-done';
      case TaskStatus.IN_PROGRESS: return 'status-progress';
      case TaskStatus.REVIEW: return 'status-review';
      default: return 'status-todo';
    }
  }
}
