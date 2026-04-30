import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'todo_tasks';

  getTasks(): Task[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(title: string, categoryId: string | null = null): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      categoryId,
      createdAt: Date.now()
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  completeTask(id: string): void {
    const tasks = this.getTasks().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.saveTasks(tasks);
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  }

  getByCategory(categoryId: string | null): Task[] {
    const tasks = this.getTasks();
    if (!categoryId) return tasks;
    return tasks.filter(t => t.categoryId === categoryId);
  }
}