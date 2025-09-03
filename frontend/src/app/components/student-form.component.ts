import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { config } from '../config/config';

interface Alumno {
  control: string;
  nombre: string;
  carrera: string;
  semestre: number;
}

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  // Inject HttpClient
  private http = inject(HttpClient);

  // Student data
  alumno: Alumno = {
    control: '',
    nombre: '',
    carrera: '',
    semestre: 1
  };

  // Backend URL (configurable)
  backendUrl = config.backendUrl;

  // Component state
  isSubmitting = signal(false);
  message = signal('');
  messageType = signal('');

  async onSubmit() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.message.set('');

    try {
      // Prepare the data to send
      const studentData = {
        control: this.alumno.control,
        nombre: this.alumno.nombre,
        carrera: this.alumno.carrera,
        semestre: this.alumno.semestre
      };

      console.log('Sending data to:', `${this.backendUrl}/crud/alumno`);
      console.log('Data:', studentData);

      // Make the POST request to the backend using Angular HttpClient
      const response = await this.http.post(
        `${this.backendUrl}/crud/alumno`,
        studentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).toPromise();

      // Success handling
      console.log('Response:', response);
      this.message.set('¡Alumno registrado exitosamente!');
      this.messageType.set('success');
      
      // Reset the form
      this.resetForm();

    } catch (error: any) {
      // Error handling
      console.error('Error sending data:', error);
      
      let errorMessage = 'Error al registrar el alumno. ';
      
      if (error.status) {
        // Server responded with error status
        errorMessage += `Código: ${error.status}. ${error.error?.message || 'Error del servidor'}`;
      } else if (error.name === 'HttpErrorResponse') {
        // Request was made but no response received
        errorMessage += 'No se pudo conectar con el servidor. Verifica la URL del backend.';
      } else {
        // Something else happened
        errorMessage += error.message;
      }
      
      this.message.set(errorMessage);
      this.messageType.set('error-msg');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm() {
    this.alumno = {
      control: '',
      nombre: '',
      carrera: '',
      semestre: 1
    };
  }
}
