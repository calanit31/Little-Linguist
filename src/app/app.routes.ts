import { Routes } from '@angular/router';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { FormsComponent } from './forms/forms.component';

export const routes: Routes = [
    {path:"",
    component:CategoriesTableComponent

    },
{
    path:"edit/:id",
    component:FormsComponent
},
{
    path:"edit",
    component:FormsComponent
}
];


