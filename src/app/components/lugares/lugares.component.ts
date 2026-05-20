import { Component, OnInit } from '@angular/core';
import { TurismoService } from '../../services/turismo.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf'; // Importación correcta para Angular

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  usuarioActivo: string = '';
  listaLugares: any[] = [];
  mostrarModal: boolean = false;

  constructor(private turismoService: TurismoService, private router: Router) {}

  ngOnInit(): void {
    // 1. Capturar dinámicamente el usuario que inició sesión real
    const user = localStorage.getItem('usuario');
    if (user) {
      this.usuarioActivo = user;
    } else {
      // Si intentan entrar a /lugares sin loguearse, los devuelve por seguridad
      this.router.navigate(['/login']);
    }

    // 2. Cargar los lugares turísticos de la base de datos
    this.turismoService.getLugares().subscribe({
      next: (data: any) => {
        this.listaLugares = data;
      },
      error: (err: any) => {
        console.error('Error al traer los lugares:', err);
      }
    });
  }

  // Control del Modal de Soporte
  alternarAyuda(estado: boolean): void {
    this.mostrarModal = estado;
  }

  // Acción: Cerrar Sesión
  logout(): void {
    localStorage.clear(); // Limpia los tokens guardados
    alert('Sesión cerrada correctamente');
    this.router.navigate(['/login']);
  }

  // Acción: Eliminar Cuenta
  eliminarCuenta(): void {
    if (confirm('¿Estás completamente seguro de que deseas eliminar tu cuenta de Tripify? Esta acción no se puede deshacer.')) {
      // Aquí puedes conectar en el futuro una petición DELETE a tu backend
      alert('Cuenta eliminada con éxito');
      this.logout();
    }
  }

  // Acción: Exportar a PDF usando jsPDF
  exportarPDF(): void {
    const doc = new jsPDF();
    
    // Configuración estética del documento PDF
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Tripify - Reporte de Rutas Turísticas', 20, 20);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Generado por el usuario: ${this.usuarioActivo}`, 20, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 37);
    
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42); // Línea divisoria horizontal
    
    let yPosition = 55;
    
    // Iterar dinámicamente sobre la lista de lugares cargados
    this.listaLugares.forEach((lugar, index) => {
      // Validar si el texto se sale de la página para evitar desbordes
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${lugar.nombre}`, 20, yPosition);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`Descripción: ${lugar.descripcion || 'Sin descripción'}`, 25, yPosition + 7);
      
      // Si tu esquema incluye nivel de seguridad, lo mapeamos aquí
      if (lugar.seguridad) {
        doc.text(`Nivel de Seguridad: ${lugar.seguridad}`, 25, yPosition + 14);
        yPosition += 30;
      } else {
        yPosition += 22;
      }
    });
    
    // Descarga del archivo
    doc.save(`Rutas_Turisticas_${this.usuarioActivo}.pdf`);
  }
}
