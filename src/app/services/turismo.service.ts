import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurismoService {
  private API_URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/registro`, usuarioData);
  }

  // <-- ASEGÚRATE DE QUE ESTA FUNCIÓN ESTÉ AQUÍ ADENTRO Y GUARDA EL ARCHIVO
  iniciarSesion(usuarioData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, usuarioData);
  }

  getLugares(): Observable<any> {
    return this.http.get(`${this.API_URL}/lugares`);
  }
}