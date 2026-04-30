import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TaskFormPage implements OnInit {
  @Input() initialCategoryId: string | null = null;

  title: string = '';
  selectedCategoryId: string | null = null;
  categories: Category[] = [];

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.selectedCategoryId = this.initialCategoryId;
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (!this.title.trim()) return;
    this.modalCtrl.dismiss({
      title: this.title.trim(),
      categoryId: this.selectedCategoryId
    }, 'confirm');
  }

  selectCategory(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
  }
}