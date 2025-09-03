import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentFormComponent } from './components/student-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
