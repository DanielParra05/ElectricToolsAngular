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
import { FormsComponent } from './ordenes/forms.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { OrdenComponent } from './ordenes/orden.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { PaginatorComponent } from './paginator/paginator.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Home
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'ordenes', component: OrdenComponent },
  { path: 'ordenes/form/:id', component: FormsComponent},
  { path: 'ordenes/form', component: FormsComponent},
  { path: 'contabilidad', component: ContabilidadComponent},
  { path: 'ajustes', component: AjustesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    FormsComponent,
    HomeComponent,
    OrdenComponent,
    AjustesComponent,
    ContabilidadComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    ClienteService], // Providers es para los servicios de la app
  bootstrap: [AppComponent]
})
export class AppModule { }
