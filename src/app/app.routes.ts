import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { EditTrainerComponent } from './pages/edit-trainer/edit-trainer';
import { EditUnitComponent } from './pages/edit-unit/edit-unit';
import { Records } from './pages/records/records';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path:'',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                title: 'Dashboard'
            },
            {
                path: 'Edit-Trainers',
                component:EditTrainerComponent,
                title: 'Trainers'
            },
            {
                path: 'Edit-Units',
                component:EditUnitComponent,
                title: 'Units'
            },
            {
                path: 'records',
                component: Records,
                title: 'Records'
            },

        ]
    }

];
