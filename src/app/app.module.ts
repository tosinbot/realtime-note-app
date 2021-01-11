import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { AuthGuardService } from './core/services/auth-guard.service';
import { NavigationBarComponent } from './shared/layouts/navigation-bar/navigation-bar.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { TextEditorComponent } from './modules/text-editor/text-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AuthenticationComponent,
    TextEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
