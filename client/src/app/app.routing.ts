import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes:
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent} from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';

// Constante para rutas, un arreglo con el path de ruta:
const appRoutes: Routes = [
	{path: '', component: RegisterComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'login', component: LoginComponent },
	{path: 'admin', component: AdminComponent },
	{path: 'usuario', component: UserComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);