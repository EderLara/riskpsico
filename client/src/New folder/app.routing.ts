import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes:
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';

// Constante para rutas, un arreglo con el path de ruta:
const appRoutes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: '', component: RegisterComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'admin', component: AdminComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);