import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {ExerciseLoggerComponent} from "./component/exercise-logger/exercise-logger.component";
import {ExerciseInfoComponent} from "./component/exercise-info/exercise-info.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'exercise-logger', component: ExerciseLoggerComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'exercise-info', component: ExerciseInfoComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
];

