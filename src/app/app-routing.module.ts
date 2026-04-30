import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full'
  },
  {
    path: 'task-list',
    loadChildren: () => import('./pages/task-list/task-list.module').then(m => m.TaskListPageModule)
  },
  {
    path: 'category-manager',
    loadChildren: () => import('./pages/category-manager/category-manager.module').then(m => m.CategoryManagerPageModule)
  },
  {
    path: 'task-form',
    loadChildren: () => import('./pages/task-form/task-form.module').then( m => m.TaskFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }