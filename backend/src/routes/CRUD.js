import express from 'express';
import Alumno from '../models/alumno.js';

const router = express.Router();


router.get("/alumnos", async (req, res) => {
  const alumnos = await Alumno.find();
  res.json(alumnos);
});


router.post("/alumno", async (req, res) => {
  try {
    const alumno = new Alumno(req.body);
    await alumno.save();
    res.json(alumno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;