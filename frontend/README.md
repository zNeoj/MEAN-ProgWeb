# Student Registration Form - Angular Frontend

This is a simple Angular application that provides a form to register students and send the data to a backend via HTTP POST requests.

## Features

- Simple form with validation for student data:
  - Control (string) - Student ID
  - Nombre (string) - Student name
  - Carrera (string) - Career/Major
  - Semestre (number) - Semester (1-12)

- Configurable backend URL
- Two versions available:
  1. **Angular HttpClient version** (default) - Works immediately
  2. **Axios version** - Requires axios installation

## Quick Setup

### 1. For Angular HttpClient Version (Default)
The application is ready to use immediately. Just run:
```bash
npm start
```

### 2. For Axios Version (Optional)
If you want to use the axios version:

1. Install axios:
```bash
npm install axios
```

2. Update the main app component to use the axios version by replacing:
```typescript
import { StudentFormComponent } from './components/student-form.component';
```
with:
```typescript
import { StudentFormAxiosComponent } from './components/student-form-axios.component';
```

3. And in the imports array, replace `StudentFormComponent` with `StudentFormAxiosComponent`

4. In the template, replace `<app-student-form></app-student-form>` with `<app-student-form-axios></app-student-form-axios>`

## Configuration

### Backend URL Configuration
The backend URL can be easily configured by editing the file:
```
src/app/config/config.ts
```

Change the `backendUrl` value to match your backend server:
```typescript
export const config = {
  backendUrl: 'http://your-backend-server:port'  // Change this
};
```

You can also change it dynamically in the form interface.

## API Endpoint

The form sends a POST request to:
```
{backendUrl}/crud/alumno
```

With JSON data structure:
```json
{
  "control": "string",
  "nombre": "string", 
  "carrera": "string",
  "semestre": number
}
```

## Features Included

- **Form Validation**: All fields are required with appropriate validation
- **Loading State**: Shows "Enviando..." when submitting
- **Error Handling**: Displays detailed error messages
- **Success Messages**: Confirms when data is sent successfully
- **Form Reset**: Clears form after successful submission
- **Responsive Design**: Works on different screen sizes
- **Configurable Backend**: Easy to change backend URL

## Development Server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend Requirements

Your backend should have a POST endpoint at `/crud/alumno` that accepts JSON data with the student information. Make sure to:

1. Set up CORS to allow requests from your frontend
2. Accept JSON content type
3. Return appropriate HTTP status codes
4. Handle errors gracefully

Example backend endpoint (Express.js):
```javascript
app.post('/crud/alumno', (req, res) => {
  const { control, nombre, carrera, semestre } = req.body;
  
  // Your database logic here
  
  res.json({ message: 'Alumno registrado exitosamente', data: req.body });
});
```
