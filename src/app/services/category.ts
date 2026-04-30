import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly STORAGE_KEY = 'todo_categories';

  getCategories(): Category[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addCategory(name: string, color: string = '#3880ff'): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color
    };
    categories.push(newCategory);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
    return newCategory;
  }

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
  }

  editCategory(id: string, name: string, color: string): void {
    const categories = this.getCategories().map(c =>
      c.id === id ? { ...c, name, color } : c
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
  }
}