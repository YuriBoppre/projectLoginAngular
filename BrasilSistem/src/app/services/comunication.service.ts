import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../views/login/usuario';

type RetornoLogin = { success: boolean, message: string };

@Injectable({
  providedIn: 'root'
})

export class ComunicationService {

  url = 'http://localhost:8080/api/teste';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.url + '/' + usuario.id, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  realizarLogin(usuario: Usuario): Observable<RetornoLogin> {
    return this.httpClient.post<RetornoLogin>(this.url + '/login', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
