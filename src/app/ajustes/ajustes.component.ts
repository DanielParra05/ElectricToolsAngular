import { Component, OnInit } from '@angular/core';
import { Ajustes } from './ajustes';
import { AjusteService } from './ajustes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  public ajustes: Ajustes = new Ajustes();

  constructor(private ajustesService: AjusteService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.cargarAjustes();
  }

  public cargarAjustes(): void {
    this.ajustesService.getAjustes().subscribe((ajustes) => this.ajustes = ajustes);
  }

  public save(): void {
    console.log('Clicked');
    console.log(this.ajustes);
    this.ajustesService.create(this.ajustes).subscribe(
      cliente => {
        this.router.navigate(['/ajustes']);
        swal.fire('Solicitud Exitosa', 'Los ajustes han sido almacenados exitosamente!', 'success');
      }
    );
  }

}
