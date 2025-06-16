import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task, Project, TaskStatus, TaskPriority, ProjectStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.getMockTasks());
  private projectsSubject = new BehaviorSubject<Project[]>(this.getMockProjects());

  tasks$ = this.tasksSubject.asObservable();
  projects$ = this.projectsSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  addTask(task: Omit<Task, 'id' | 'createdDate'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdDate: new Date()
    };

    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, newTask]);
    
    return of(newTask);
  }

  updateTask(taskId: string, updates: Partial<Task>): Observable<Task | null> {
    const currentTasks = this.tasksSubject.value;
    const taskIndex = currentTasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return of(null);

    const updatedTask = { ...currentTasks[taskIndex], ...updates };
    const updatedTasks = [...currentTasks];
    updatedTasks[taskIndex] = updatedTask;
    
    this.tasksSubject.next(updatedTasks);
    return of(updatedTask);
  }

  deleteTask(taskId: string): Observable<boolean> {
    const currentTasks = this.tasksSubject.value;
    const filteredTasks = currentTasks.filter(t => t.id !== taskId);
    
    if (filteredTasks.length === currentTasks.length) return of(false);
    
    this.tasksSubject.next(filteredTasks);
    return of(true);
  }

  getTasksByProject(projectId: string): Observable<Task[]> {
    const tasks = this.tasksSubject.value.filter(t => t.projectId === projectId);
    return of(tasks);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getMockTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Design Homepage Layout',
        description: 'Create wireframes and mockups for the new homepage design',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assignee: 'John Doe',
        projectId: 'proj1',
        createdDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-01'),
        tags: ['design', 'ui/ux'],
        estimatedHours: 16,
        actualHours: 12
      },
      {
        id: '2',
        title: 'Implement User Authentication',
        description: 'Set up login/logout functionality with JWT tokens',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assignee: 'Jane Smith',
        projectId: 'proj1',
        createdDate: new Date('2024-01-16'),
        dueDate: new Date('2024-02-05'),
        tags: ['backend', 'security'],
        estimatedHours: 24
      },
      {
        id: '3',
        title: 'Write API Documentation',
        description: 'Document all REST endpoints with examples',
        status: TaskStatus.DONE,
        priority: TaskPriority.LOW,
        assignee: 'Mike Johnson',
        projectId: 'proj2',
        createdDate: new Date('2024-01-10'),
        dueDate: new Date('2024-01-25'),
        tags: ['documentation', 'api'],
        estimatedHours: 8,
        actualHours: 6
      }
    ];
  }

  private getMockProjects(): Project[] {
    return [
      {
        id: 'proj1',
        name: 'E-commerce Platform',
        description: 'Modern online shopping platform with React frontend',
        status: ProjectStatus.ACTIVE,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-15'),
        teamMembers: ['John Doe', 'Jane Smith', 'Bob Wilson'],
        progress: 65
      },
      {
        id: 'proj2',
        name: 'Mobile App Backend',
        description: 'REST API for mobile application',
        status: ProjectStatus.PLANNING,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-30'),
        teamMembers: ['Mike Johnson', 'Sarah Davis'],
        progress: 25
      }
    ];
  }
}
