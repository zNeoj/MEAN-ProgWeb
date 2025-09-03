import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { config } from '../config/config';

// We'll declare axios as any to avoid TypeScript errors when it's not installed
declare const axios: any;

interface Alumno {
  control: string;
  nombre: string;
  carrera: string;
  semestre: number;
}

@Component({
  selector: 'app-student-form-axios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="form-container">
      <h2>Registro de Alumno (Versión con Axios)</h2>
      
      <form (ngSubmit)="onSubmit()" #studentForm="ngForm" class="student-form">
        <div class="form-group">
          <label for="control">Control:</label>
          <input 
            type="text" 
            id="control" 
            name="control"
            [(ngModel)]="alumno.control" 
            required 
            #control="ngModel"
            class="form-control"
          >
          <div *ngIf="control.invalid && control.touched" class="error">
            Control es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre"
            [(ngModel)]="alumno.nombre" 
            required 
            #nombre="ngModel"
            class="form-control"
          >
          <div *ngIf="nombre.invalid && nombre.touched" class="error">
            Nombre es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="carrera">Carrera:</label>
          <input 
            type="text" 
            id="carrera" 
            name="carrera"
            [(ngModel)]="alumno.carrera" 
            required 
            #carrera="ngModel"
            class="form-control"
          >
          <div *ngIf="carrera.invalid && carrera.touched" class="error">
            Carrera es requerida
          </div>
        </div>

        <div class="form-group">
          <label for="semestre">Semestre:</label>
          <input 
            type="number" 
            id="semestre" 
            name="semestre"
            [(ngModel)]="alumno.semestre" 
            required 
            min="1"
            max="12"
            #semestre="ngModel"
            class="form-control"
          >
          <div *ngIf="semestre.invalid && semestre.touched" class="error">
            Semestre es requerido (1-12)
          </div>
        </div>

        <button 
          type="submit" 
          [disabled]="studentForm.invalid || isSubmitting()" 
          class="submit-btn"
        >
          {{ isSubmitting() ? 'Enviando...' : 'Registrar Alumno' }}
        </button>
      </form>

      <div *ngIf="message()" class="message" [ngClass]="messageType()">
        {{ message() }}
      </div>

      <!-- Backend URL Configuration -->
      <div class="config-section">
        <h3>Configuración del Backend</h3>
        <div class="form-group">
          <label for="backendUrl">URL del Backend:</label>
          <input 
            type="text" 
            id="backendUrl" 
            [(ngModel)]="backendUrl" 
            class="form-control"
            placeholder="http://localhost:3000"
          >
          <small class="help-text">
            Cambia esta URL para apuntar a tu servidor backend
          </small>
        </div>
      </div>

      <!-- Instructions for axios installation -->
      <div class="instructions">
        <h3>Instrucciones para usar Axios:</h3>
        <ol>
          <li>Abre una terminal en la carpeta del frontend</li>
          <li>Ejecuta: <code>npm install axios</code></li>
          <li>Recarga la página para usar esta versión con axios</li>
        </ol>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }

    .student-form {
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-control:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }

    .submit-btn {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .submit-btn:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    }

    .message {
      padding: 10px;
      border-radius: 4px;
      margin-top: 15px;
      text-align: center;
    }

    .success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .error-msg {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .config-section {
      border-top: 1px solid #ddd;
      padding-top: 20px;
      margin-top: 20px;
    }

    h3 {
      color: #666;
      margin-bottom: 15px;
    }

    .help-text {
      color: #666;
      font-size: 12px;
      margin-top: 5px;
      display: block;
    }

    .instructions {
      border-top: 1px solid #ddd;
      padding-top: 20px;
      margin-top: 20px;
      background-color: #e9ecef;
      padding: 15px;
      border-radius: 5px;
    }

    code {
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
    }
  `]
})
export class StudentFormAxiosComponent {
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

    // Check if axios is available
    if (typeof axios === 'undefined') {
      this.message.set('Axios no está instalado. Por favor sigue las instrucciones al final del formulario.');
      this.messageType.set('error-msg');
      return;
    }

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

      // Make the POST request to the backend using axios
      const response = await axios.post(
        `${this.backendUrl}/crud/alumno`,
        studentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Success handling
      console.log('Response:', response.data);
      this.message.set('¡Alumno registrado exitosamente con Axios!');
      this.messageType.set('success');
      
      // Reset the form
      this.resetForm();

    } catch (error: any) {
      // Error handling
      console.error('Error sending data:', error);
      
      let errorMessage = 'Error al registrar el alumno. ';
      
      if (error.response) {
        // Server responded with error status
        errorMessage += `Código: ${error.response.status}. ${error.response.data?.message || 'Error del servidor'}`;
      } else if (error.request) {
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
