import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.page.html',
  styleUrls: ['./category-manager.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CategoryManagerPage implements OnInit {
  categories: Category[] = [];

  readonly colorOptions = [
    '#3880ff', '#10dc60', '#f04141', '#ffce00',
    '#7044ff', '#f4a942', '#26d0ce', '#92949c'
  ];

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  ionViewWillEnter() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva categoría',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre de la categoría' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.name?.trim()) {
              const randomColor = this.colorOptions[
                Math.floor(Math.random() * this.colorOptions.length)
              ];
              this.categoryService.addCategory(data.name.trim(), randomColor);
              this.loadCategories();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar categoría',
      inputs: [
        { name: 'name', type: 'text', value: category.name, placeholder: 'Nombre' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name?.trim()) {
              this.categoryService.editCategory(category.id, data.name.trim(), category.color);
              this.loadCategories();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar categoría',
      message: `¿Seguro que quieres eliminar "${category.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.categoryService.deleteCategory(category.id);
            this.loadCategories();
          }
        }
      ]
    });
    await alert.present();
  }
}