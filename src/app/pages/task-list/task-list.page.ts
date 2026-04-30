import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Task } from '../../models/task';
import { Category } from '../../models/category';
import { TaskService } from '../../services/task';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class TaskListPage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.categories = this.categoryService.getCategories();
    this.tasks = this.taskService.getByCategory(this.selectedCategoryId);
  }

  filterByCategory(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    this.tasks = this.taskService.getByCategory(categoryId);
  }

  async addTask() {
  const alert = await this.alertCtrl.create({
    header: 'Nueva tarea',
    inputs: [
      { name: 'title', type: 'text', placeholder: 'Nombre de la tarea' }
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Agregar',
        handler: (data) => {
          if (data.title?.trim()) {
            this.taskService.addTask(data.title.trim(), this.selectedCategoryId);
            this.loadData();
          }
        }
      }
    ]
  }
);
  await alert.present();
}

  toggleComplete(task: Task) {
    this.taskService.completeTask(task.id);
    this.loadData();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.loadData();
  }

  getCategoryName(categoryId: string | null): string {
    if (!categoryId) return '';
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : '';
  }

  getCategoryColor(categoryId: string | null): string {
    if (!categoryId) return '#92949c';
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.color : '#92949c';
  }
}