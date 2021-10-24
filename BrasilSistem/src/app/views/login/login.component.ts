import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  public usuario = {} as Usuario;

  constructor(private httpClient: HttpClient, private comunicationService: ComunicationService, private toastr: ToastrService) { }

  realizarLogin(): void {
    this.comunicationService.realizarLogin(this.usuario).subscribe(result => {
      if(result.success) {
         this.toastr.success(result.message, 'Alerta')
      }

      this.toastr.error(result.message, 'Alerta');
    });
  }

}
