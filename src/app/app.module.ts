import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- 1. IMPORTA ESTA LÍNEA

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LugaresComponent } from './components/lugares/lugares.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LugaresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // <-- 2. AGREGA ESTA LÍNEA AQUÍ
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }