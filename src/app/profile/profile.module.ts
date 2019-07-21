//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../core/material.module';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: '',
                redirectTo: 'car'
            },
            {
                path: 'car',
                component: CarComponent
            },
            {
                path: 'user',
                component: UserComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        CarComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ],
})
export class ProfileModule { }
