import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Task } from '../../models/task';
import { Category } from '../../models/category';
import { TaskService } from '../../services/task';
import { CategoryService } from '../../services/category';
import { FeatureFlagService } from '../../services/feature-flag';
import { TaskFormPage } from '../task-form/task-form.page';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListPage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;
  showStatistics: boolean = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private featureFlagService: FeatureFlagService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.featureFlagService.init();
    this.showStatistics = this.featureFlagService.isEnabled('show_statistics');
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.categories = this.categoryService.getCategories();
    this.tasks = this.taskService.getByCategory(this.selectedCategoryId);
    this.cdr.markForCheck();
  }

  filterByCategory(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    this.tasks = this.taskService.getByCategory(categoryId);
    this.cdr.markForCheck();
  }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: TaskFormPage,
      componentProps: { initialCategoryId: this.selectedCategoryId }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.taskService.addTask(data.title, data.categoryId);
      this.loadData();
    }
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

  // trackBy functions — optimizan el re-render de listas largas
  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  // Estadísticas — solo se renderizan si el feature flag está activo
  get totalTasks(): number {
    return this.taskService.getTasks().length;
  }

  get completedTasks(): number {
    return this.taskService.getTasks().filter(t => t.completed).length;
  }

  get pendingTasks(): number {
    return this.totalTasks - this.completedTasks;
  }
}