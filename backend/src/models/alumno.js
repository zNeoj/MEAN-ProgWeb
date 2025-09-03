import mongoose from '../config/db.js';

const userSchema = new mongoose.Schema({
  control: { type: String, required: true },
  nombre: { type: String, required: true },
  carrera: { type: String, required: true, unique: true },
  semestre: { type: Number, required: true}
});

export default mongoose.model("Alumno", userSchema);