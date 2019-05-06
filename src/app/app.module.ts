import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { OrdenComponent } from './orden/orden.component'; // Modulo para trabajr con formularios

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Home
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'orden', component: OrdenComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    HomeComponent,
    OrdenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    ClienteService], // Providers es para los servicios de la app
  bootstrap: [AppComponent]
})
export class AppModule { }
