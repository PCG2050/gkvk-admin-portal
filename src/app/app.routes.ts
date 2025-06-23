import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { EditTrainer } from './pages/edit-trainer/edit-trainer';
import { EditUnit } from './pages/edit-unit/edit-unit';

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
                component:EditTrainer,
                title: ' Trainers'
            },
            {
                path: 'Edit-Units',
                component:EditUnit,
                title: 'Edit Units'
            },

        ]
    }

];
