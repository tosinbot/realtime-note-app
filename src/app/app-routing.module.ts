import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { TextEditorComponent } from './modules/text-editor/text-editor.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'editor', component: TextEditorComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
