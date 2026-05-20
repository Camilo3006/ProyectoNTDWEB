import { Component } from '@angular/core';
import { TurismoService } from '../../services/turismo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tabActiva: string = 'login';
  usuarioData = { usuario: '', password: '' };

  constructor(private turismoService: TurismoService, private router: Router) {}

  cambiarTab(tab: string) {
    this.tabActiva = tab;
  }

  alIngresar() {
    if (!this.usuarioData.usuario || !this.usuarioData.password) {
      alert('Por favor llena todos los campos');
      return;
    }

    this.turismoService.iniciarSesion(this.usuarioData).subscribe({
      next: (res: any) => { // <-- Se solucionó el error agregando ': any'
        console.log('Respuesta de Node:', res);
        
        if (res.mensaje === "Login correcto") {
          alert('¡Bienvenido a Tripify!');
          
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', res.usuario);

          this.router.navigate(['/lugares']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: (err: any) => { // <-- Se solucionó el error agregando ': any'
        console.error('Error en el puente HTTP:', err);
        alert('No se pudo conectar con el servidor backend');
      }
    });
  }

  alRegistrar() {
    this.turismoService.registrarUsuario(this.usuarioData).subscribe({
      next: (res: any) => { // <-- Se solucionó el error agregando ': any'
        if (res.mensaje === "Registrado") {
          alert('Usuario registrado con éxito en MongoDB Atlas');
          this.tabActiva = 'login';
          this.usuarioData.password = '';
        } else {
          alert('No se pudo completar el registro');
        }
      },
      error: (err: any) => { // <-- Se solucionó el error agregando ': any'
        console.error(err);
        alert('El usuario ya existe o hubo un problema en la BD');
      }
    });
  }
}